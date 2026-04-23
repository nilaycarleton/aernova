'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Environment, useGLTF, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import * as THREE from 'three';

function GlbModel({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  const model = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 3 / maxDim : 1;
  }, [model]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={scale} />
      </Center>
    </group>
  );
}

function WireframeFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00D4FF" wireframe />
    </mesh>
  );
}

export default function ModelViewer({
  modelPath,
  className = '',
}: {
  modelPath: string;
  className?: string;
}) {
  const [canvasReady, setCanvasReady] = useState(false);
  const { active, progress } = useProgress();
  const showLoader = !canvasReady || active;

  return (
    <div className={`relative w-full h-full min-h-[300px] bg-[#04080F] ${className}`}>
      {/* Loading overlay */}
      {showLoader && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
          <Loader2 size={24} className="text-cyan animate-spin" style={{ color: '#00D4FF' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5A7090' }}>
            Loading Model {progress > 0 ? `${Math.round(progress)}%` : ''}
          </span>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        onCreated={() => setCanvasReady(true)}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} />
        <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#00D4FF" />

        <Suspense fallback={<WireframeFallback />}>
          <GlbModel modelPath={modelPath} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={2}
          maxDistance={14}
        />
      </Canvas>

      {/* Corner bracket decorations */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-cyan/40 pointer-events-none" style={{ borderColor: 'rgba(0,212,255,0.4)' }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-cyan/40 pointer-events-none" style={{ borderColor: 'rgba(0,212,255,0.4)' }} />
      <div className="absolute bottom-10 left-3 w-5 h-5 border-b border-l border-cyan/40 pointer-events-none" style={{ borderColor: 'rgba(0,212,255,0.4)' }} />
      <div className="absolute bottom-10 right-3 w-5 h-5 border-b border-r border-cyan/40 pointer-events-none" style={{ borderColor: 'rgba(0,212,255,0.4)' }} />

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(90,112,144,0.7)', backgroundColor: 'rgba(4,8,15,0.8)', padding: '2px 10px' }}>
          Drag to rotate · Scroll to zoom
        </span>
      </div>
    </div>
  );
}
'use client';

import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Environment, useGLTF, useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import * as THREE from 'three';

function GlbModel({
  modelPath,
  scaleMultiplier = 1,
}: {
  modelPath: string;
  scaleMultiplier?: number;
}) {
  const { scene } = useGLTF(modelPath);

  const model = useMemo(() => scene.clone(true), [scene]);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const baseScale = maxDim > 0 ? 3 / maxDim : 1;

    return baseScale * scaleMultiplier;
  }, [model, scaleMultiplier]);

  return (
    <group rotation={[0, 0, 0]}>
      <Center>
        <primitive object={model} scale={scale} />
      </Center>
    </group>
  );
}

function WireframeFallback({ thumbnail = false }: { thumbnail?: boolean }) {
  return (
    <mesh rotation={[0.35, 0.55, 0]}>
      <boxGeometry args={thumbnail ? [1.2, 1.2, 1.2] : [1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00D4FF" wireframe />
    </mesh>
  );
}

export default function ModelViewer({
  modelPath,
  className = '',
  thumbnail = false,
  enableControls = true,
  showHint = true,
  showDecorations = true,
}: {
  modelPath: string;
  className?: string;
  thumbnail?: boolean;
  enableControls?: boolean;
  showHint?: boolean;
  showDecorations?: boolean;
}) {
  const [canvasReady, setCanvasReady] = useState(false);
  const { active, progress } = useProgress();
  const showLoader = !canvasReady || active;

  return (
    <div
      className={`relative w-full h-full min-h-[300px] bg-[#04080F] ${className}`}
    >
      {showLoader && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <Loader2
            size={thumbnail ? 18 : 24}
            className="animate-spin"
            style={{ color: '#00D4FF' }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: thumbnail ? '0.55rem' : '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#5A7090',
            }}
          >
            Loading Model {progress > 0 ? `${Math.round(progress)}%` : ''}
          </span>
        </div>
      )}

      <Canvas
        camera={
          thumbnail
            ? { position: [0, 0, 5], fov: 42 }
            : { position: [0, 0.5, 6], fov: 50 }
        }
        onCreated={() => setCanvasReady(true)}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={thumbnail ? 0.95 : 0.7} />
        <directionalLight position={[5, 8, 5]} intensity={thumbnail ? 1.6 : 1.4} />
        <directionalLight position={[-4, -2, -4]} intensity={0.35} color="#00D4FF" />

        <Suspense fallback={<WireframeFallback thumbnail={thumbnail} />}>
          <GlbModel
            modelPath={modelPath}
            scaleMultiplier={thumbnail ? 1.1 : 1}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={enableControls && !thumbnail}
          enableRotate={enableControls}
          minDistance={2}
          maxDistance={14}
        />
      </Canvas>

      {showDecorations && (
        <>
          <div
            className="absolute top-3 left-3 w-5 h-5 border-t border-l pointer-events-none"
            style={{ borderColor: 'rgba(0,212,255,0.4)' }}
          />
          <div
            className="absolute top-3 right-3 w-5 h-5 border-t border-r pointer-events-none"
            style={{ borderColor: 'rgba(0,212,255,0.4)' }}
          />
          <div
            className="absolute bottom-10 left-3 w-5 h-5 border-b border-l pointer-events-none"
            style={{ borderColor: 'rgba(0,212,255,0.4)' }}
          />
          <div
            className="absolute bottom-10 right-3 w-5 h-5 border-b border-r pointer-events-none"
            style={{ borderColor: 'rgba(0,212,255,0.4)' }}
          />
        </>
      )}

      {showHint && enableControls && !thumbnail && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(90,112,144,0.7)',
              backgroundColor: 'rgba(4,8,15,0.8)',
              padding: '2px 10px',
            }}
          >
            Drag to rotate · Scroll to zoom
          </span>
        </div>
      )}
    </div>
  );
}
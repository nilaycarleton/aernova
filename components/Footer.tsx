export default function Footer() {
  return (
    <footer className="relative border-t border-edge bg-surface py-9 px-8 lg:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/brand/Aernova.png"
            alt="Aernova"
            className="w-28 h-auto object-contain opacity-90"
          />
        </div>

        <p className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke text-center">
          Precision Drone Photogrammetry — Toronto, ON
        </p>

        <p className="font-mono-dm text-[0.6rem] tracking-widest uppercase text-smoke/50">
          © {new Date().getFullYear()} Aernova
        </p>
      </div>
    </footer>
  );
}

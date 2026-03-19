import Image from "next/image";

export function Header() {
  return (
    <header className="bg-dark px-6 py-4 flex items-center">
      <div className="bg-teal-dark rounded-lg p-1.5 mr-3">
        <Image src="/knoten-white.svg" alt="" width={22} height={22} />
      </div>
      <span className="text-white text-xs font-light tracking-widest uppercase">
        Praxis Lebensgefühl
      </span>
    </header>
  );
}

import Image from "next/image";

export function Header() {
  return (
    <header className="bg-teal px-6 py-4 flex items-center">
      <Image src="/knoten.svg" alt="" width={28} height={28} className="mr-3" />
      <span className="text-white text-xs font-light tracking-widest uppercase">
        Praxis Lebensgefühl
      </span>
    </header>
  );
}

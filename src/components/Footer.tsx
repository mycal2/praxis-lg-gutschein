import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-warm-sand border-t border-warm-beige px-6 py-5 text-center">
      <p className="text-xs text-gray-500">
        Praxis Lebensgefühl · Holtenauer Straße 82 · 24105 Kiel
      </p>
      <p className="text-xs mt-1">
        <Link href="/impressum" className="text-teal hover:text-teal-dark">Impressum</Link>
        {" · "}
        <Link href="/datenschutz" className="text-teal hover:text-teal-dark">Datenschutz</Link>
      </p>
    </footer>
  );
}

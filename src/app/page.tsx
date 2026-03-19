import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GutscheinForm } from "@/components/GutscheinForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero */}
      <section className="bg-teal py-16 text-center relative overflow-hidden">
        <Image src="/knoten-white.svg" alt="" width={72} height={72} className="mx-auto mb-5 opacity-90" />
        <h1 className="text-3xl md:text-4xl font-light text-white tracking-widest uppercase">Gutschein</h1>
        <p className="text-white/80 text-base font-light mt-2 tracking-wide">Schenken Sie sich ein neues Lebensgefühl</p>
      </section>
      {/* Intro */}
      <section className="px-6 py-8 text-center max-w-xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          Fordern Sie hier Ihren <strong>10% Gutschein</strong> für Ihre nächste Sitzung bei uns an. Bitte füllen Sie das unten stehende Formular aus, Sie bekommen den Gutschein dann per E-Mail zugesendet.
        </p>
      </section>
      {/* Form */}
      <section className="px-6 pb-12 max-w-xl mx-auto w-full flex-1">
        <GutscheinForm />
      </section>
      <Footer />
    </div>
  );
}

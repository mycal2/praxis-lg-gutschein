import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GutscheinForm } from "@/components/GutscheinForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark to-[#3a3a3a] py-16 text-center">
        <Image src="/knoten.svg" alt="" width={72} height={72} className="mx-auto mb-5 opacity-85" />
        <h1 className="text-3xl md:text-4xl font-light text-white tracking-widest uppercase">Gutschein</h1>
        <p className="text-teal-light text-base font-light mt-2 tracking-wide">Schenken Sie sich ein neues Lebensgefühl</p>
      </section>
      {/* Intro */}
      <section className="px-6 py-8 text-center max-w-xl mx-auto">
        <p className="text-gray-700 leading-relaxed">
          Lösen Sie jetzt Ihren <strong>10 % Gutschein</strong> für Ihre erste Sitzung ein. Füllen Sie das Formular aus und erhalten Sie Ihren persönlichen Gutschein direkt per E-Mail.
        </p>
      </section>
      {/* Form */}
      <section className="px-6 pb-12 max-w-lg mx-auto w-full flex-1">
        <GutscheinForm />
      </section>
      <Footer />
    </div>
  );
}

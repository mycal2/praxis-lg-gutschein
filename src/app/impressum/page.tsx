import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum – Praxis Lebensgefühl",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-light text-dark tracking-wide mb-8">Impressum</h1>

          <section className="text-gray-700 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-dark mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                Julia Messer-Blohm &amp; Nina Bartoli<br />
                Praxis Lebensgefühl<br />
                Holtenauer Straße 82<br />
                24105 Kiel
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-dark mb-2">Kontakt</h2>
              <p>
                Telefon: 0431 – 301 499 42<br />
                E-Mail:{" "}
                <a
                  href="mailto:info@praxis-lebensgefuehl.com"
                  className="text-teal hover:text-teal-dark"
                >
                  info@praxis-lebensgefuehl.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-dark mb-2">
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .
              </p>
              <p className="mt-2">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Quelle: Impressum erstellt über{" "}
                <a
                  href="https://www.e-recht24.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  e-recht24.de
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

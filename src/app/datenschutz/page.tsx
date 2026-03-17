import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutz – Praxis Lebensgefühl",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-light text-dark tracking-wide mb-8">Datenschutzerklärung</h1>

          <div className="text-gray-700 space-y-8">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">1. Datenschutz auf einen Blick</h2>

              <h3 className="font-semibold text-dark mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="font-semibold text-dark mb-2">Datenerfassung auf dieser Website</h3>
              <p className="mb-4">
                Die Datenerfassung auf dieser Website erfolgt zum einen durch
                Daten, die Sie uns mitteilen, und zum anderen durch technische
                Systeme, die beim Besuch der Website automatisch erfasst werden
                (z.&nbsp;B. Browsertyp, Betriebssystem, Uhrzeit des Seitenaufrufs).
              </p>

              <h3 className="font-semibold text-dark mb-2">Ihre Rechte</h3>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                Herkunft, Empfänger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                Recht, die Berichtigung oder Löschung dieser Daten zu verlangen,
                die Einwilligung zur Datenverarbeitung zu widerrufen sowie das
                Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">2. Hosting</h2>
              <p className="mb-2">
                <strong>Anbieter:</strong> Schlundtech, Johanna-Dachs-Str. 55, 93055 Regensburg
              </p>
              <p>
                Wir hosten die Inhalte unserer Website bei einem externen
                Anbieter. Die personenbezogenen Daten, die auf dieser Website
                erfasst werden, werden auf den Servern des Hosters gespeichert.
                Die Nutzung des Hosters erfolgt zum Zwecke der Vertragserfüllung
                gegenüber unseren potenziellen und bestehenden Kunden (Art. 6
                Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen
                und effizienten Bereitstellung unseres Online-Angebots durch
                einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className="font-semibold text-dark mb-2">Datenschutz</h3>
              <p className="mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="font-semibold text-dark mb-2">Verantwortliche Stelle</h3>
              <p className="mb-4">
                Praxis Lebensgefühl<br />
                Holtenauer Straße 82<br />
                24105 Kiel<br />
                Telefon: 0431 – 301 499 42<br />
                E-Mail:{" "}
                <a
                  href="mailto:jm@praxis-lebensgefuehl.com"
                  className="text-teal hover:text-teal-dark"
                >
                  jm@praxis-lebensgefuehl.com
                </a>
              </p>

              <h3 className="font-semibold text-dark mb-2">Speicherdauer</h3>
              <p className="mb-4">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere
                Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
                Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
                Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
                gelöscht, sofern keine anderen rechtlich zulässigen Gründe für
                die Speicherung bestehen.
              </p>

              <h3 className="font-semibold text-dark mb-2">Rechtsgrundlagen der Datenverarbeitung</h3>
              <p className="mb-2">
                Soweit wir Ihre Einwilligung zur Verarbeitung personenbezogener
                Daten eingeholt haben, ist Art. 6 Abs. 1 lit. a DSGVO
                Rechtsgrundlage. Für die Verarbeitung zur Vertragserfüllung gilt
                Art. 6 Abs. 1 lit. b DSGVO, für rechtliche Verpflichtungen
                Art. 6 Abs. 1 lit. c DSGVO, und für berechtigte Interessen
                Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="font-semibold text-dark mb-2">SSL-/TLS-Verschlüsselung</h3>
              <p className="mb-4">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte eine SSL-bzw.
                TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                daran, dass die Adresszeile des Browsers von „http://" auf
                „https://" wechselt und an dem Schloss-Symbol in Ihrer
                Browserzeile.
              </p>

              <h3 className="font-semibold text-dark mb-2">Widerrufsrecht</h3>
              <p className="mb-4">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
                ausdrücklichen Einwilligung möglich. Sie können eine bereits
                erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit
                der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
                Widerruf unberührt.
              </p>

              <h3 className="font-semibold text-dark mb-2">Beschwerderecht</h3>
              <p>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">4. Datenerfassung auf dieser Website</h2>

              <h3 className="font-semibold text-dark mb-2">Cookies</h3>
              <p className="mb-4">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies
                richten auf Ihrem Rechner keinen Schaden an und enthalten keine
                Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
                effektiver und sicherer zu machen. Die meisten der von uns
                verwendeten Cookies sind so genannte „Session-Cookies". Sie
                werden nach Ende Ihres Besuchs automatisch gelöscht. Andere
                Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese
                löschen.
              </p>

              <h3 className="font-semibold text-dark mb-2">Server-Log-Dateien</h3>
              <p className="mb-4">
                Der Provider der Seiten erhebt und speichert automatisch
                Informationen in so genannten Server-Log-Dateien, die Ihr
                Browser automatisch an uns übermittelt. Dies sind: Browsertyp
                und Browserversion, verwendetes Betriebssystem, Referrer URL,
                Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage,
                IP-Adresse. Eine Zusammenführung dieser Daten mit anderen
                Datenquellen wird nicht vorgenommen.
              </p>

              <h3 className="font-semibold text-dark mb-2">Kontaktformular</h3>
              <p className="mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von
                Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="font-semibold text-dark mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p>
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird
                Ihre Anfrage inklusive aller daraus hervorgehenden
                personenbezogenen Daten (Name, Anfrage) zum Zwecke der
                Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">5. Soziale Medien</h2>

              <h3 className="font-semibold text-dark mb-2">Facebook</h3>
              <p className="mb-4">
                Auf dieser Website sind Elemente des sozialen Netzwerks Facebook
                integriert. Anbieter ist die Meta Platforms Ireland Limited,
                4 Grand Canal Square, Dublin 2, Irland. Wenn Sie unsere Website
                besuchen, wird über das Plugin eine direkte Verbindung zwischen
                Ihrem Browser und dem Facebook-Server hergestellt. Die
                Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
                bzw. Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
              </p>

              <h3 className="font-semibold text-dark mb-2">Instagram</h3>
              <p className="mb-4">
                Auf dieser Website sind Funktionen des Dienstes Instagram
                eingebunden. Diese Funktionen werden angeboten durch die Meta
                Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal
                Harbour, Dublin 2, Irland. Die Verarbeitung der Daten erfolgt
                auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="font-semibold text-dark mb-2">Pinterest</h3>
              <p>
                Auf dieser Website verwenden wir Social Plugins des sozialen
                Netzwerkes Pinterest, das von der Pinterest Europe Ltd.,
                Palmerston House, 2nd Floor, Fenian Street, Dublin 2, Irland,
                betrieben wird. Die Verarbeitung erfolgt auf Grundlage von
                Art. 6 Abs. 1 lit. f DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO
                und § 25 Abs. 1 TTDSG.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-dark mb-4">6. Plugins und Tools</h2>

              <h3 className="font-semibold text-dark mb-2">YouTube</h3>
              <p className="mb-4">
                Diese Website bindet Videos der YouTube ein. Betreiber der Seiten
                ist die Google Ireland Limited, Gordon House, Barrow Street,
                Dublin 4, Irland. Wenn Sie eine unserer Seiten besuchen, auf der
                YouTube eingebunden ist, wird eine Verbindung zu den Servern von
                YouTube hergestellt. Weitere Informationen zum Umgang mit
                Nutzerdaten finden Sie in der Datenschutzerklärung von YouTube
                unter:{" "}
                <a
                  href="https://policies.google.com/privacy?hl=de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  https://policies.google.com/privacy
                </a>
                .
              </p>

              <h3 className="font-semibold text-dark mb-2">Google Maps</h3>
              <p className="mb-4">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                Irland. Zur Nutzung der Funktionen von Google Maps ist es
                notwendig, Ihre IP-Adresse zu speichern. Diese Informationen
                werden in der Regel an einen Server von Google in den USA
                übertragen und dort gespeichert. Weitere Informationen:{" "}
                <a
                  href="https://policies.google.com/privacy?hl=de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  https://policies.google.com/privacy
                </a>
                .
              </p>

              <h3 className="font-semibold text-dark mb-2">Spotify</h3>
              <p>
                Auf dieser Website sind Funktionen des Musik-Dienstes Spotify
                eingebunden. Anbieter ist die Spotify AB, Birger Jarlsgatan 61,
                113 56 Stockholm in Schweden. Die Spotify Plugins erkennen Sie an
                dem grünen Logo auf unserer Seite. Weitere Informationen zur
                Datenschutzerklärung von Spotify finden Sie unter:{" "}
                <a
                  href="https://www.spotify.com/de/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  https://www.spotify.com/de/legal/privacy-policy/
                </a>
                .
              </p>
            </section>

            <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
              Quelle:{" "}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

import {
  Html, Head, Body, Container, Section, Row, Column,
  Text, Img, Hr,
} from "@react-email/components";

type GutscheinEmailProps = {
  firstName: string;
  lastName: string;
  practitioners: string[];
  code: string;
  expiryDate: string;
  message?: string;
};

export default function GutscheinEmail({
  firstName = "Julia",
  lastName = "Muster",
  practitioners = ["Julia Messer-Blohm"],
  code = "LG-2026-A7X3BC",
  expiryDate = "17. Juni 2026",
  message = "",
}: GutscheinEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://praxis-lg-gutschein.up.railway.app";
  return (
    <Html lang="de">
      <Head />
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F0F0F0", fontFamily: "'Nunito Sans', -apple-system, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#FFFFFF" }}>
          {/* Header */}
          <Section style={{ backgroundColor: "#2C2C2C", padding: "28px 32px", textAlign: "center" as const }}>
            <Img src={`${baseUrl}/knoten.png`} width="48" height="48" alt="Praxis Lebensgefühl" style={{ margin: "0 auto 8px" }} />
            <Text style={{ fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: 0 }}>Praxis Lebensgefühl</Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "32px 32px", textAlign: "center" as const }}>
            <Text style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#5A9A94", margin: "0 0 8px 0" }}>Ihr Gutschein</Text>
            <Text style={{ fontSize: 52, fontWeight: 300, color: "#74B4AF", lineHeight: "1", margin: "12px 0 4px" }}>10%</Text>
            <Text style={{ fontSize: 16, fontWeight: 300, color: "#2C2C2C", margin: "0 0 20px" }}>Rabatt auf eine Sitzung</Text>

            <Hr style={{ borderColor: "#E8DDD3", width: 50, margin: "20px auto" }} />

            {/* Details */}
            <Section style={{ textAlign: "left" as const }}>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13 }}>Name</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500 }}>{firstName} {lastName}</Column></Row>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13, borderTop: "1px solid #F0F0F0" }}>Therapeut/in</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500, borderTop: "1px solid #F0F0F0" }}>{practitioners.join(", ")}</Column></Row>
              <Row><Column style={{ width: 120, padding: "6px 0", color: "#7A7A7A", fontSize: 13, borderTop: "1px solid #F0F0F0" }}>Gültig bis</Column><Column style={{ padding: "6px 0", color: "#2C2C2C", fontSize: 13, fontWeight: 500, borderTop: "1px solid #F0F0F0" }}>{expiryDate}</Column></Row>
            </Section>

            {/* Code box */}
            <Section style={{ backgroundColor: "#F5F0EB", borderRadius: 10, padding: "16px", margin: "20px 0", textAlign: "center" as const }}>
              <Text style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#7A7A7A", margin: "0 0 6px 0" }}>Gutschein-Code</Text>
              <Text style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: "#2C2C2C", letterSpacing: "0.15em", margin: 0 }}>{code}</Text>
            </Section>

            {/* Optional personal message */}
            {message && (
              <Section style={{ backgroundColor: "rgba(116,180,175,0.06)", borderLeft: "3px solid #74B4AF", borderRadius: "0 6px 6px 0", padding: "12px 16px", margin: "20px 0", textAlign: "left" as const }}>
                <Text style={{ fontSize: 11, fontWeight: 600, color: "#5A9A94", margin: "0 0 4px 0" }}>Persönliche Nachricht</Text>
                <Text style={{ fontSize: 13, color: "#4A4A4A", fontStyle: "italic", margin: 0 }}>„{message}"</Text>
              </Section>
            )}

            <Hr style={{ borderColor: "#E8DDD3", width: 50, margin: "20px auto" }} />

            <Text style={{ fontSize: 12, color: "#7A7A7A", lineHeight: "1.7", margin: 0 }}>
              Zur Einlösung nennen Sie Ihren Code bei der Terminvereinbarung.{"\n"}
              Kontakt: info@praxis-lebensgefuehl.com · 0431 - 301 499 42
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#2C2C2C", padding: "16px 32px", textAlign: "center" as const }}>
            <Text style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0 }}>Praxis Lebensgefühl · Holtenauer Str. 82 · 24105 Kiel · praxis-lebensgefuehl.com</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

import { Html, Head, Body, Container, Section, Text, Hr } from "@react-email/components";

type NotificationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  practitioners: string[];
  message?: string;
  code: string;
  expiryDate: string;
};

export default function NotificationEmail({
  firstName = "Julia",
  lastName = "Muster",
  email = "julia@beispiel.de",
  phone = "",
  practitioners = ["Julia Messer-Blohm"],
  message = "",
  code = "LG-2026-A7X3BC",
  expiryDate = "17. Juni 2026",
}: NotificationEmailProps) {
  const labelStyle = { fontSize: 12, color: "#7A7A7A", margin: "0 0 2px 0" as const };
  const valueStyle = { fontSize: 14, color: "#2C2C2C", margin: "0 0 16px 0" as const };
  return (
    <Html lang="de">
      <Head />
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#F0F0F0", fontFamily: "'Nunito Sans', sans-serif" }}>
        <Container style={{ maxWidth: 480, margin: "0 auto", backgroundColor: "#FFFFFF", padding: "32px" }}>
          <Text style={{ fontSize: 18, fontWeight: 600, color: "#2C2C2C", margin: "0 0 4px 0" }}>🎫 Neuer Gutschein angefordert</Text>
          <Text style={{ fontSize: 13, color: "#7A7A7A", margin: "0 0 24px 0" }}>Code: {code}</Text>
          <Hr style={{ borderColor: "#F0F0F0" }} />
          <Text style={labelStyle}>Name</Text>
          <Text style={valueStyle}>{firstName} {lastName}</Text>
          <Text style={labelStyle}>E-Mail</Text>
          <Text style={valueStyle}>{email}</Text>
          {phone && (<><Text style={labelStyle}>Telefon</Text><Text style={valueStyle}>{phone}</Text></>)}
          <Text style={labelStyle}>Beraterin</Text>
          <Text style={valueStyle}>{practitioners.join(", ")}</Text>
          {message && (<><Text style={labelStyle}>Persönliche Nachricht</Text><Text style={valueStyle}>„{message}"</Text></>)}
          <Text style={labelStyle}>Gültig bis</Text>
          <Text style={valueStyle}>{expiryDate}</Text>
        </Container>
      </Body>
    </Html>
  );
}

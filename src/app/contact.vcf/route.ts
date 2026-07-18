import { BUSINESS } from "@/lib/utils";

export function generateVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Camera;Scan;;;",
    `FN:${BUSINESS.name}`,
    `ORG:${BUSINESS.name}`,
    `TITLE:Camera Sales, Service & Rental`,
    `TEL;TYPE=WORK,VOICE:${BUSINESS.phone}`,
    `TEL;TYPE=CELL:${BUSINESS.usedCamera}`,
    `TEL;TYPE=CELL:${BUSINESS.service}`,
    `EMAIL;TYPE=WORK:${BUSINESS.email}`,
    `URL:${BUSINESS.website}`,
    `ADR;TYPE=WORK:;;${BUSINESS.location.building}, ${BUSINESS.location.street};${BUSINESS.location.city};;Kerala;IN`,
    `NOTE:MD: ${BUSINESS.md}. Trusted Camera Sales, Service & Rental Since ${BUSINESS.established}.`,
    "END:VCARD",
  ].join("\r\n");
}

export async function GET() {
  const vcard = generateVCard();

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard;charset=utf-8",
      "Content-Disposition": 'inline; filename="CameraScan.vcf"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

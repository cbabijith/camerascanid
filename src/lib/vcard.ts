import { BUSINESS } from "./utils";

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

export function downloadVCard() {
  // Navigate to server route that serves .vcf with proper Content-Type
  // iOS Safari recognizes text/vcard and opens the Contacts app
  window.location.href = "/contact.vcf";
}

export async function saveContactNative(): Promise<boolean> {
  try {
    const contacts = (navigator as any).contacts;
    const manager = (navigator as any).contactsManager;
    if (contacts && "select" in contacts) {
      await contacts.select(
        ["name", "tel", "email", "address"],
        { multiple: false }
      );
      return true;
    }
    if (manager && "saveContact" in manager) {
      await manager.saveContact({
        name: [BUSINESS.name],
        tel: [BUSINESS.phoneRaw, BUSINESS.usedCamera, BUSINESS.service],
        email: [BUSINESS.email],
      });
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function isContactsAPISupported(): boolean {
  if (typeof navigator === "undefined") return false;
  const contacts = (navigator as any).contacts;
  const manager = (navigator as any).contactsManager;
  return !!(contacts && "select" in contacts) || !!(manager && "saveContact" in manager);
}

export async function shareBusiness(): Promise<boolean> {
  const shareData = {
    title: BUSINESS.name,
    text: `${BUSINESS.tagline} — Since ${BUSINESS.established}\n${BUSINESS.phone} · ${BUSINESS.location.full}`,
    url: BUSINESS.website,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch {
      return false;
    }
  }
  try {
    await navigator.clipboard.writeText(
      `${BUSINESS.name}\n${BUSINESS.tagline}\n${BUSINESS.website}\n${BUSINESS.phone}`
    );
    return true;
  } catch {
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

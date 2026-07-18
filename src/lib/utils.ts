import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BUSINESS = {
  name: "Camera Scan",
  tagline: "Trusted Camera Sales, Service & Rental",
  established: "1994",
  headline: "More than 30 Years of Trusted Camera Expertise.",
  description:
    "We provide professional camera sales, repair, rental services, used cameras, accessories, and authorized servicing for leading brands.",
  about:
    "Camera Scan has been serving photography enthusiasts and professionals since 1994. We specialize in camera sales, rentals, repairs, accessories, and used camera equipment while providing trusted service for leading brands.",
  location: {
    building: "YMCA Buildings",
    street: "Sastri Road",
    city: "Kottayam",
    full: "YMCA Buildings, Sastri Road, Kottayam",
  },
  phone: "0481-2568876",
  phoneRaw: "04812568876",
  phoneIntl: "+914812568876",
  usedCamera: "8301870721",
  usedCameraIntl: "+918301870721",
  service: "9188526787",
  serviceIntl: "+919188526787",
  email: "camerascan@gmail.com",
  website: "https://www.camerascan.org",
  whatsapp: "https://wa.me/9188526787",
  whatsappMessage:
    "Hello Camera Scan,\nI'm interested in your services.",
  instagram: "https://www.instagram.com/camera_scan_official/?hl=en",
  facebook: "https://www.facebook.com/camerascankottayam/",
  youtube: "https://www.youtube.com/@camerascan1",
  md: "Abey K George",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Camera+Scan+Kottayam+Sastri+Road",
  mapsEmbed:
    "https://www.google.com/maps?q=YMCA+Buildings+Sastri+Road+Kottayam&output=embed",
  hours: {
    weekdays: "9:00 AM – 7:00 PM",
    sunday: "Closed",
  },
} as const;

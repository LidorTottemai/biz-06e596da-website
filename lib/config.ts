import businessConfig from '../business.config.json';

export const config = businessConfig;

export const {
  name,
  nameEn,
  phone,
  fax,
  whatsapp,
  email,
  address,
  addressEn,
  city,
  cityEn,
  country,
  postalCode,
  website,
  bookingType,
  defaultLocale,
  locales,
  coordinates,
  hours,
} = businessConfig;

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${whatsapp}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

export function getPhoneUrl(): string {
  const digits = phone.replace(/\D/g, '');
  return `tel:+972${digits.startsWith('0') ? digits.slice(1) : digits}`;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.javor.org.il';

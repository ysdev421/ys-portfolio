const DEFAULT_CONTACT = "hello@example.com";
const DEFAULT_SUBJECT = "YS Journal 購読希望";

export function getNewsletterMailto(email?: string) {
  const subject = encodeURIComponent(DEFAULT_SUBJECT);
  const body = email
    ? `&body=${encodeURIComponent(`購読希望メール: ${email}`)}`
    : "";
  return `mailto:${DEFAULT_CONTACT}?subject=${subject}${body}`;
}

export function getNewsletterHref() {
  return process.env.NEXT_PUBLIC_NEWSLETTER_URL?.trim() || getNewsletterMailto();
}


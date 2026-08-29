import nodemailer from "nodemailer";
import { serverEnv, siteUrl } from "@/lib/env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const env = serverEnv();
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER
      ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
      : undefined,
  });
  return transporter;
}

type Locale = "nl" | "en";

function body(locale: Locale, unsubUrl: string) {
  if (locale === "en") {
    return {
      subject: "You're on the Mizara waitlist",
      text: [
        "Hi,",
        "",
        "Thanks for your interest in Mizara — bookkeeping for Dutch sole traders.",
        "You're on the waitlist. As soon as there's room in the private beta, we'll",
        "send an invitation to this address. We won't email you otherwise.",
        "",
        "See you soon,",
        "Mizara",
        "",
        `Not interested anymore? Unsubscribe: ${unsubUrl}`,
      ].join("\n"),
    };
  }
  return {
    subject: "Je staat op de wachtlijst voor Mizara",
    text: [
      "Hoi,",
      "",
      "Bedankt voor je interesse in Mizara — boekhouding voor Nederlandse zzp'ers.",
      "Je staat op de wachtlijst. Zodra er plek is in de private bèta krijg je een",
      "uitnodiging op dit adres. Verder mailen we je niet.",
      "",
      "Tot snel,",
      "Mizara",
      "",
      `Geen interesse meer? Meld je af: ${unsubUrl}`,
    ].join("\n"),
  };
}

export async function sendWaitlistConfirmation(
  to: string,
  locale: Locale,
  unsubToken: string,
) {
  const env = serverEnv();
  const unsubUrl = `${siteUrl}/api/waitlist/unsubscribe?token=${unsubToken}`;
  const { subject, text } = body(locale, unsubUrl);
  await getTransporter().sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    text,
    headers: {
      "List-Unsubscribe": `<${unsubUrl}>`,
    },
  });
}

import type { Dict } from "./types";

export const en: Dict = {
  meta: {
    title: "Mizara — bookkeeping for Dutch sole traders",
    description:
      "Bookkeeping for Dutch sole traders (zzp): invoices, receipts, and a live estimate of what to set aside for the tax office. Join the private beta waitlist.",
  },
  nav: {
    tagline: "Bookkeeping for freelancers",
    roadmap: "Roadmap",
    waitlistCta: "Join the waitlist",
    signIn: "Sign in",
    themeToggle: "Toggle light and dark",
    langLabel: "Language",
  },
  hero: {
    badge: "Private beta · coming soon",
    title: "Your tax reserve, always up to date.",
    subhead:
      "Mizara is bookkeeping for Dutch sole traders (zzp). Invoices, receipts, and a live estimate of what to set aside for the tax office — VAT, income tax and the healthcare contribution.",
    formNote: "No spam. One email when we go live.",
    signInPrompt: "Already have an account? Sign in",
    reserveLabel: "Set aside for the tax office",
    reserveCaption: "Estimated reserve for 2026 based on your entries.",
    reserveParts: [
      { label: "VAT", amount: "€ 2,140" },
      { label: "Income tax", amount: "€ 2,058" },
      { label: "Healthcare", amount: "€ 614" },
    ],
  },
  trust: [
    "2026 Dutch tax office rates",
    "Regular VAT and KOR",
    "Export whenever you want",
    "Hosted in the EU",
  ],
  reserve: {
    eyebrow: "The core",
    title: "No more surprises at tax time.",
    body: "Every invoice and every receipt adjusts the figure. Each quarter you see VAT, income tax (box 1) and the healthcare contribution separately, with a small safety margin. Money you can't spend is set aside in black and white.",
    caveat:
      "Mizara makes an estimate and prepares your return — you file it yourself. Salaried income, box 2/3 and mortgage interest are out of scope; if in doubt, check your return or your accountant.",
    points: [
      "Updated live after every entry",
      "Broken down per quarter",
      "Includes a small safety margin",
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything for your books, nothing extra.",
    items: [
      {
        title: "Invoices & quotes",
        body: "Numbered PDF invoices, email delivery, quotes with a digital signature, and recurring invoices.",
      },
      {
        title: "Receipts with OCR",
        body: "Drop in a photo or PDF; Mizara reads the amount and VAT. You confirm before it saves.",
      },
      {
        title: "VAT & income-tax return, prepared",
        body: "Boxes for your quarterly VAT return and a box 1 summary for the annual return, as PDF.",
      },
      {
        title: "Switching is simple",
        body: "Import from Moneybird, e-Boekhouden, Exact Online, or a CSV/Excel file.",
      },
      {
        title: "KOR or regular VAT",
        body: "Use the small-business scheme with a threshold meter, or plain 21/9/0%.",
      },
      {
        title: "Bring your accountant",
        body: "Invite your bookkeeper with read-only access to your books.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "From entry to filing in three steps.",
    steps: [
      {
        title: "Log income and expenses",
        body: "Create invoices in Mizara; drag receipts in.",
      },
      {
        title: "Watch your reserve grow",
        body: "After every entry there's an up-to-date amount ready to set aside.",
      },
      {
        title: "File in ten minutes",
        body: "Download the prepared figures and copy them into your tax return.",
      },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "What's here, and what's coming.",
    description:
      "Mizara is in private beta. The foundation is in place; here's what we're working on now and what's planned next.",
    columns: [
      {
        status: "shipped",
        label: "In the beta now",
        items: [
          "Invoices, quotes with a digital signature, and recurring invoices",
          "Receipts with AI recognition (OCR), always with your confirmation",
          "Live tax reserve: VAT, income tax and the healthcare contribution",
          "VAT return and annual income-tax summary as PDF",
          "KOR with a threshold meter, or regular VAT (21/9/0%)",
          "iDEAL payment links via Mollie",
          "Import from Moneybird, e-Boekhouden, Exact Online and CSV/Excel",
          "Invite your accountant with read-only access",
          "Full data export (CSV)",
        ],
      },
      {
        status: "building",
        label: "In progress",
        items: [
          "Bank feed: pull in and match transactions automatically",
          "Smarter expense categorisation",
          "Mileage and travel-cost tracking",
          "Further polish of the mobile experience",
        ],
      },
      {
        status: "planned",
        label: "Planned",
        items: [
          "Time tracking with an hours-criterion counter",
          "Reminders for filing and payment deadlines",
          "Year-end report export for your accountant",
          "Multiple sets of books under one account",
          "Integrations via an API",
        ],
      },
    ],
    footnote:
      "This roadmap sets direction, not guarantees. Order and timing may change.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Your numbers stay yours.",
    points: [
      "No marketing profiles",
      "OCR is optional and always with your confirmation",
      "Full export (CSV) and deletion whenever you want",
      "Database and hosting within the EU",
      "No automatic link to the tax office",
    ],
  },
  faq: {
    eyebrow: "Frequently asked",
    title: "One more thing.",
    items: [
      {
        q: "Is Mizara an accountant?",
        a: "No. Mizara is software that keeps your books and prepares your return. For advice or review, invite your own accountant.",
      },
      {
        q: "Does Mizara file my tax return?",
        a: "Mizara prepares the figures and boxes. You file with the tax office yourself — deliberately, with no automatic link.",
      },
      {
        q: "What does it cost?",
        a: "We'll announce that at launch. Waitlist members hear first and get an introductory price.",
      },
      {
        q: "Who is it for?",
        a: "Dutch sole traders with a single set of books: one-person businesses, freelancers, starters. Salaried income, box 2 and box 3 are out of scope.",
      },
      {
        q: "Can I import my data?",
        a: "Yes, from Moneybird, e-Boekhouden, Exact Online, or a CSV/Excel file.",
      },
      {
        q: "Where is my data stored?",
        a: "In a database within the EU. You can export everything or delete your account whenever you want.",
      },
    ],
  },
  cta: {
    title: "Want first access to Mizara?",
    body: "Join the waitlist. We invite waitlist members to the private beta first.",
  },
  footer: {
    blurb: "Bookkeeping for Dutch sole traders.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    signIn: "Sign in",
    rights: "© 2026 Mizara",
  },
  form: {
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submit: "Add me to the list",
    submitting: "Sending…",
    successTitle: "You're on the list.",
    successBody: "Check your inbox for confirmation.",
    errorGeneric: "Something went wrong. Try again in a moment.",
    errorEmail: "Enter a valid email address.",
    errorRate: "Give it a minute and try again.",
  },
  legal: {
    privacyTitle: "Privacy",
    privacyBody:
      "This page only collects the email address you leave on the waitlist, plus your language choice and technical data (IP address, browser) to prevent abuse. We use the address solely to invite you once to the private beta. You can unsubscribe at any time via the link in the confirmation email. A full privacy statement for the product itself will follow at launch.",
    termsTitle: "Terms",
    termsBody:
      "Mizara is still in private beta. Joining the waitlist grants no right to access, a price, or a launch date. We may change or discontinue the service and this page. Full terms of use will follow at launch.",
    back: "Back to home",
  },
};

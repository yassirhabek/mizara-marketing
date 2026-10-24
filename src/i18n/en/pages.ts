import type { Dict } from "../types";
import { appUrl } from "@/lib/env";

export const audience: Dict["audience"] = {
  meta: {
    title: "Bookkeeping for freelancers and sole traders in the Netherlands",
    description:
      "Mizara is made for freelancers with a Dutch sole proprietorship who do their own bookkeeping and want to know what they can spend. See who it fits and who it doesn't.",
  },
  h1: "For freelancers who do their own bookkeeping",
  lead: "You're a designer, developer, coach, photographer or tradesperson. You send invoices, have expenses and don't want a surprise every quarter. That's what Mizara is for.",
  fits: {
    title: "Mizara fits if",
    items: [
      "you have a sole proprietorship (eenmanszaak) and are an entrepreneur for Dutch income tax",
      "you keep your own books, possibly with an accountant looking over your shoulder",
      "you file quarterly VAT returns or use the KOR",
      "you want to know what to set aside without doing the maths yourself",
      "you want your invoices, receipts and bank statement in one place",
    ],
  },
  notFits: {
    title: "Look elsewhere if",
    items: [
      "you want a direct bank connection that pulls everything in automatically",
      "you're looking for full tax advice about your whole situation; for that you need an accountant or tax adviser",
      "your income tax depends heavily on things the estimate doesn't cover, such as tax partnership, box 2 or loss relief",
    ],
  },
  sections: [
    {
      id: "starters",
      title: "Just started",
      blocks: [
        {
          kind: "p",
          text: "In your first years you often qualify for the starter deduction, and you don't yet know what you'll earn. That's exactly when seeing what to set aside after each invoice helps. See also [income tax for freelancers](/kennisbank/inkomstenbelasting-zzp).",
        },
      ],
    },
    {
      id: "kor",
      title: "Small revenue, KOR",
      blocks: [
        {
          kind: "p",
          text: "If you use the small business scheme, you don't charge VAT. Mizara tracks how close you are to the €20,000 threshold. Read more about [the KOR](/kennisbank/kor-regeling).",
        },
      ],
    },
    {
      id: "groeiend",
      title: "Growing revenue",
      blocks: [
        {
          kind: "p",
          text: "The more you earn, the bigger the share of each extra euro that goes to the Belastingdienst. Setting aside a fixed percentage then often falls short. Mizara calculates over your whole year. Why that matters is in [how much tax to set aside](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
        },
      ],
    },
    {
      id: "accountant",
      title: "With an accountant",
      blocks: [
        {
          kind: "p",
          text: "Does an accountant handle your year-end or tax return? Give them access to your books in Mizara. You book throughout the year, your accountant reviews and checks.",
        },
      ],
    },
    {
      id: "overstappen",
      title: "Switching",
      blocks: [
        {
          kind: "p",
          text: "Using Moneybird, e-Boekhouden or Exact today? Bring your data, or import a CSV or XAF file. See [all features](/functies) or [try the demo first](/demo).",
        },
      ],
    },
  ],
};

export const faq: Dict["faq"] = {
  meta: {
    title: "Frequently asked questions about Mizara",
    description:
      "Answers about Mizara: what it does, how the tax estimate works, bank imports, reading receipts, your data and switching from another package.",
  },
  h1: "Frequently asked questions",
  lead: "Question not listed? Email [support@mizara.app](mailto:support@mizara.app).",
  groups: [
    {
      title: "About Mizara",
      items: [
        {
          q: "What is Mizara?",
          a: "Online bookkeeping software for freelancers in the Netherlands. You create invoices, book expenses, import your bank statement and see what to set aside for VAT, income tax and Zvw.",
        },
        {
          q: "Is Mizara an accountant?",
          a: "No. Mizara is software. It calculates and prepares figures, but doesn't give advice about your personal situation.",
        },
        {
          q: "Who is Mizara for?",
          a: "Freelancers with a Dutch sole proprietorship who do their own bookkeeping. Read more on [for freelancers](/voor-zzpers).",
        },
        {
          q: "Can I try Mizara without an account?",
          a: "Yes. The [interactive demo](/demo) runs in your browser with a fictional freelancer. Nothing is saved.",
        },
      ],
    },
    {
      title: "Tax",
      items: [
        {
          q: "How does Mizara work out what to set aside?",
          a: "It adds the VAT for the current quarter to the income tax and Zvw on this year's profit so far, plus a 2% margin, and rounds up. See [the tax overview](/functies/belastingoverzicht).",
        },
        {
          q: "Is the estimate tax advice?",
          a: "No. It's an estimate based on your bookings and your tax profile. It is not a tax return and not tax advice. Check everything with your accountant or in Mijn Belastingdienst.",
        },
        {
          q: "Does Mizara file my tax return?",
          a: "Mizara prepares the figures for your VAT return, EC sales list (ICP) and income tax. You file them yourself with the Belastingdienst.",
        },
        {
          q: "What does the estimate leave out?",
          a: "Tax partnership and allocation, box 2, loss relief and refunds. If you also have a salary, your own home or savings, your actual tax may differ.",
        },
        {
          q: "Does Mizara support the KOR?",
          a: "Yes. You indicate in your profile that you use the KOR and see how close you are to the €20,000 threshold. Read more about [the KOR](/kennisbank/kor-regeling).",
        },
      ],
    },
    {
      title: "Bank and receipts",
      items: [
        {
          q: "Is there a connection with my bank?",
          a: "No, there's no direct bank connection. You import your statement as a CAMT.053 or MT940 file. See [bank imports](/functies/bank).",
        },
        {
          q: "Which bank files work?",
          a: "CAMT.053 (.xml) and MT940 (.mt940, .sta, .txt), for euro accounts.",
        },
        {
          q: "Does Mizara read my receipts perfectly?",
          a: "No, and we don't promise that. Values read from a receipt are a suggestion. You check and confirm them yourself before anything is booked.",
        },
      ],
    },
    {
      title: "Data and switching",
      items: [
        {
          q: "Can I switch from another package?",
          a: "Yes. You can import from Moneybird, e-Boekhouden and Exact, or use a CSV or XAF file.",
        },
        {
          q: "Can I export my data or delete my account?",
          a: "Yes. You can export your data and delete your account from the settings.",
        },
        {
          q: "Where can I read how Mizara handles my data?",
          a: `In the [app's privacy statement](${appUrl}/privacy). It also lists the parties that process data for Mizara.`,
        },
        {
          q: "What does Mizara cost?",
          a: "You can start invoicing for free. For your complete bookkeeping you pick a plan, which you can cancel monthly. All amounts are on [pricing](/prijzen).",
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          q: "I have tax questions about my situation. Who can I ask?",
          a: "The Belastingdienst, an accountant or a tax adviser. Mizara helps organise your figures, but doesn't assess your personal situation. You can give your accountant access to your books.",
        },
        {
          q: "How do I reach Mizara?",
          a: "Through [support@mizara.app](mailto:support@mizara.app).",
        },
      ],
    },
  ],
};

export const legal: Dict["legal"] = {
  privacy: {
    meta: {
      title: "Privacy on mizara.app",
      description: "What this website processes: only a language cookie and your theme preference. The demo runs entirely in your browser.",
    },
    h1: "Privacy on this website",
    updated: "2026-10-23",
    intro: `This page is about the website mizara.app. For the app itself, where your bookkeeping lives, the [app's privacy statement](${appUrl}/privacy) applies.`,
    sections: [
      {
        id: "wat",
        title: "What this website stores",
        blocks: [
          {
            kind: "ul",
            items: [
              "**A language cookie** (`locale`), so you come back in the same language next time. This cookie is functional and kept for one year.",
              "**Your theme preference** (light or dark) in your browser's local storage. It never leaves your device.",
            ],
          },
          {
            kind: "p",
            text: "This website uses no advertising or tracking cookies and builds no profiles.",
          },
        ],
      },
      {
        id: "demo",
        title: "The interactive demo",
        blocks: [
          {
            kind: "p",
            text: "The demo calculates entirely in your browser. What you enter is not sent to us or anyone else and is not stored. Refresh the page and you start over.",
          },
        ],
      },
      {
        id: "server",
        title: "Technical data",
        blocks: [
          {
            kind: "p",
            text: "Like any website, the server receives technical data such as your IP address and browser to show pages and prevent abuse. We don't use it to track you.",
          },
        ],
      },
      {
        id: "contact",
        title: "Questions",
        blocks: [
          {
            kind: "p",
            text: "Email [privacy@mizara.app](mailto:privacy@mizara.app). Mizara B.V. is responsible for this website.",
          },
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Use of mizara.app",
      description: "Terms for using the mizara.app website, knowledge base and demo. The app is covered by Mizara's terms and conditions.",
    },
    h1: "Use of this website",
    updated: "2026-10-23",
    intro: `These terms cover the website mizara.app. If you use the app, the [terms and conditions](${appUrl}/terms) apply and, where relevant, the [data processing agreement](${appUrl}/verwerkersovereenkomst).`,
    sections: [
      {
        id: "informatie",
        title: "Information on this site",
        blocks: [
          {
            kind: "p",
            text: "We do our best to keep the knowledge base accurate and current, with links to the Belastingdienst. The information is general and not tax advice. Rules and amounts change; each article shows when we last reviewed it.",
          },
        ],
      },
      {
        id: "demo",
        title: "Amounts and the demo",
        blocks: [
          {
            kind: "p",
            text: "All amounts on this site and in the demo are examples with fictional figures, calculated with simplified assumptions. No rights can be derived from them and they're not meant as a basis for your tax return.",
          },
        ],
      },
      {
        id: "aansprakelijkheid",
        title: "Liability",
        blocks: [
          {
            kind: "p",
            text: "Mizara B.V. is not liable for damage resulting from relying on information on this website. Check important decisions with the Belastingdienst or an adviser.",
          },
        ],
      },
      {
        id: "contact",
        title: "Contact",
        blocks: [
          {
            kind: "p",
            text: "Mizara B.V., [info@mizara.app](mailto:info@mizara.app).",
          },
        ],
      },
    ],
  },
};

import type { Dict } from "../types";

export const features: Dict["features"] = {
  hub: {
    meta: {
      title: "Features: invoices, expenses, bank imports and tax overview",
      description:
        "What Mizara does for your freelance bookkeeping: invoices and quotes, reading receipts, importing bank statements and an estimate of your VAT, income tax and Zvw.",
    },
    h1: "What Mizara does for your bookkeeping",
    lead: "Four parts that fit together. An invoice counts towards your revenue, a payment on your statement is matched to that invoice, and your tax overview uses both.",
    extrasTitle: "And also",
    extras: [
      { title: "Clients and products", text: "Store client details and regular services or products, so an invoice is ready in a few clicks." },
      { title: "Time tracking", text: "Track your hours, including towards the hours criterion of 1,225 hours a year." },
      { title: "Ledger", text: "Every booking lands in a double-entry general ledger, with trial balance." },
      { title: "Bring your accountant", text: "Give your accountant access to your books, so you both look at the same numbers." },
      { title: "Returns prepared", text: "Figures for your VAT return, EC sales list (ICP) and income tax are ready. You file them yourself." },
      { title: "Imports", text: "Bring your books from Moneybird, e-Boekhouden, Exact or a CSV or XAF file." },
    ],
  },
  pages: {
    facturen: {
      slug: "facturen",
      nav: "Invoices",
      summary: "Invoices and quotes that meet the Dutch invoice requirements, with VAT per line and reminders when clients don't pay.",
      meta: {
        title: "Invoicing in the Netherlands",
        description:
          "Create invoices with sequential numbers and the right VAT. Quotes with digital signature, recurring invoices, payment reminders and iDEAL payments.",
      },
      h1: "Invoices that add up, and what you keep from them",
      lead: "An invoice in Mizara is more than a PDF. It counts towards your revenue, your VAT and what you set aside for the Belastingdienst straight away.",
      highlights: [
        { title: "Sequential numbering", text: "Mizara keeps track of numbering, so there are no gaps or duplicates." },
        { title: "VAT per line", text: "Choose 21%, 9% or 0% per line. VAT is totalled per rate." },
        { title: "What's left over", text: "Each invoice shows roughly what's left of that job after costs and tax." },
      ],
      sections: [
        {
          id: "factuureisen",
          title: "What an invoice must include",
          blocks: [
            {
              kind: "p",
              text: "The Belastingdienst sets requirements for invoices. Mizara fills in your fixed details and lets you add what changes per invoice. A complete invoice includes, among other things:",
            },
            {
              kind: "ul",
              items: [
                "your name, address, KvK number and VAT identification number",
                "your client's name and address",
                "a unique, sequential invoice number and the invoice date",
                "a description of what you delivered and when",
                "the amount excluding VAT, the VAT rate and the VAT amount per rate",
              ],
            },
            {
              kind: "p",
              text: "The full list is in the [invoice requirements of the Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/facturen_maken/factuureisen/) (in Dutch). Reverse-charge VAT and foreign clients require extra details.",
            },
          ],
        },
        {
          id: "offertes",
          title: "From quote to invoice",
          blocks: [
            {
              kind: "p",
              text: "Send a quote first. Your client can view and sign it online. Once they agree, you turn it into an invoice without retyping anything.",
            },
            {
              kind: "p",
              text: "For fixed monthly amounts, such as a retainer or maintenance, use a recurring invoice. Mizara creates it again at the scheduled time.",
            },
          ],
        },
        {
          id: "betaald-worden",
          title: "Getting paid",
          blocks: [
            {
              kind: "p",
              text: "Want clients to pay straight away? Connect your own Mollie account and your client gets an iDEAL payment link. That's optional; a regular bank transfer works too.",
            },
            {
              kind: "p",
              text: "If a payment doesn't arrive, send a reminder from the invoice and later a final notice. When the payment shows up on your bank statement, you match it to the invoice when you [import your statement](/functies/bank).",
            },
          ],
        },
        {
          id: "overhouden",
          title: "What do you keep from an invoice?",
          blocks: [
            {
              kind: "p",
              text: "For each invoice you see what the client pays, which costs you've linked to that job, and roughly how much income tax and Zvw the invoice adds to your year. What's left is an estimate of what you really earn.",
            },
            {
              kind: "p",
              text: "Mizara doesn't use a fixed percentage for that tax, it calculates over your whole year. Why that matters is explained in [how much tax to set aside](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Can I download an invoice as a PDF?",
          a: "Yes. You can download every invoice as a PDF or email it to your client.",
        },
        {
          q: "Do I have to use iDEAL?",
          a: "No. iDEAL payments run through your own Mollie account and are optional. Without Mollie, your account number is on the invoice and your client pays by bank transfer.",
        },
        {
          q: "Which VAT rate should I charge?",
          a: "It depends on what you supply. For most services it's 21%. Read more in [calculating VAT](/kennisbank/btw-berekenen-zzp).",
        },
      ],
      related: [
        { href: "/functies/kosten", label: "Expenses and receipts" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Calculating VAT" },
        { href: "/demo", label: "Create an invoice in the demo" },
      ],
    },
    kosten: {
      slug: "kosten",
      nav: "Expenses",
      summary: "Upload receipts, have them read and confirm them yourself. With category, VAT and the receipt attached.",
      meta: {
        title: "Booking expenses and receipts",
        description:
          "Upload a receipt and have the amount, date and VAT read for you. You check and confirm. Every expense counts towards your VAT and your profit.",
      },
      h1: "Receipts in, expenses booked. You stay in control.",
      lead: "Expenses lower your profit and the VAT you pay. But only if you book them, with the receipt attached. Mizara makes that as quick as possible.",
      highlights: [
        { title: "Reading", text: "Mizara reads the supplier, date, amount and VAT from a photo or PDF." },
        { title: "You confirm", text: "Values it reads are a suggestion. Nothing is booked until you approve." },
        { title: "Receipt kept", text: "The receipt stays with the booking, in case the Belastingdienst asks for it." },
      ],
      sections: [
        {
          id: "uitlezen",
          title: "How reading receipts works",
          blocks: [
            {
              kind: "p",
              text: "Upload a photo or PDF of a receipt or purchase invoice. Mizara recognises the details on it and fills in the form for you: supplier, date, total, VAT rate and a suggested category.",
            },
            {
              kind: "callout",
              tone: "note",
              title: "Reading isn't perfect",
              text: "A crumpled receipt, a blurry photo or an unusual layout can lead to wrong values. That's why Mizara never books anything automatically. You see the receipt next to the values and confirm yourself.",
            },
            {
              kind: "p",
              text: "Prefer to type everything in? That works too. Reading is a help, not a requirement.",
            },
          ],
        },
        {
          id: "btw-terug",
          title: "VAT on your expenses",
          blocks: [
            {
              kind: "p",
              text: "When a supplier charges VAT, you can usually deduct it as input VAT. Mizara tracks that VAT per quarter and offsets it against the VAT on your invoices. So you see what you pay on balance.",
            },
            {
              kind: "calc",
              title: "Example: flex desk in October (fictional)",
              rows: [
                { label: "Total on the receipt", value: "€223.85" },
                { label: "Of which VAT (21%)", value: "€38.85", sign: "minus" },
                { label: "Cost for your profit", value: "€185.00", strong: true },
              ],
              note: "Mizara offsets the €38.85 VAT in your fourth-quarter VAT return.",
            },
            {
              kind: "p",
              text: "Some costs are only partly deductible, such as food and drink or private use. If in doubt, check the Belastingdienst or ask your accountant.",
            },
          ],
        },
        {
          id: "aan-klus",
          title: "Linking costs to a job",
          blocks: [
            {
              kind: "p",
              text: "If an expense belongs to a specific job, link it to the invoice. That invoice then shows what the job really earns you, after costs and tax.",
            },
          ],
        },
        {
          id: "bewaren",
          title: "How long to keep receipts",
          blocks: [
            {
              kind: "p",
              text: "As a business owner you generally keep your records for 7 years, or 10 years for records about real estate. Mizara keeps the receipt with the booking, so you can find it later.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Which files can I upload?",
          a: "Photos and PDFs of receipts and purchase invoices.",
        },
        {
          q: "What if a value is read wrong?",
          a: "You correct it before you confirm. Nothing is booked without your approval.",
        },
        {
          q: "Can I book expenses from my bank statement?",
          a: "Yes. After [importing your statement](/functies/bank) you can book a payment directly as an expense or match it to a receipt you've already uploaded.",
        },
      ],
      related: [
        { href: "/functies/bank", label: "Importing bank statements" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Calculating VAT and input VAT" },
        { href: "/demo", label: "Book a receipt in the demo" },
      ],
    },
    bank: {
      slug: "bank",
      nav: "Bank",
      summary: "Import CAMT.053 or MT940 files and match payments to invoices and expenses. No direct bank connection.",
      meta: {
        title: "Importing bank statements and matching payments",
        description:
          "Import your bank statement as a CAMT.053 or MT940 file. Mizara suggests matches with invoices and expenses. No direct bank connection, you stay in charge.",
      },
      h1: "Your bank statement, without connecting your bank",
      lead: "Download a statement from your bank, import it into Mizara and match each payment to an invoice or expense. That way your books line up with what actually happened on your account.",
      highlights: [
        { title: "Files, not a connection", text: "CAMT.053 (.xml) and MT940 (.mt940, .sta, .txt) for euro accounts." },
        { title: "Suggestions", text: "Mizara spots payments that look like they belong to an open invoice or a receipt." },
        { title: "Booking rules", text: "If the same payment keeps coming back, set how it's booked: as a suggestion or automatically." },
      ],
      sections: [
        {
          id: "hoe",
          title: "How to import a statement",
          blocks: [
            {
              kind: "ol",
              items: [
                "Log in to your bank and export your transactions as CAMT.053 or MT940. Most Dutch banks offer one of the two.",
                "Upload the file in Mizara under Bank.",
                "Go through the new payments. Each one shows a suggestion, or asks what it belongs to.",
              ],
            },
            {
              kind: "callout",
              tone: "note",
              title: "Why no direct connection?",
              text: "Mizara only reads the files you upload. There's no link to your bank, so Mizara can't see or do anything on your account. The trade-off: you import yourself, for example once a month or before your VAT return.",
            },
          ],
        },
        {
          id: "koppelen",
          title: "What happens to your payments",
          blocks: [
            {
              kind: "p",
              text: "For each payment, Mizara looks for something that fits: an open invoice with the same amount, an expense you've already booked or a known counterparty. It also recognises payments that are neither revenue nor costs:",
            },
            {
              kind: "ul",
              items: [
                "transfers to and from your own accounts",
                "payouts from Mollie",
                "payments to the Belastingdienst",
              ],
            },
            {
              kind: "p",
              text: "You confirm a suggestion with one tap and undo it if it turns out wrong. A payment without a receipt can be booked directly as an expense.",
            },
          ],
        },
        {
          id: "waarom",
          title: "Why your bank belongs in your books",
          blocks: [
            {
              kind: "p",
              text: "Without your statement you don't know which invoices were really paid and which costs you forgot to book. With it, you see the difference between what you booked and what's in your account.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Does this work with my bank?",
          a: "If your bank can export transactions as CAMT.053 (.xml) or MT940 (.mt940, .sta, .txt), it works. Only euro accounts are supported.",
        },
        {
          q: "Will there be an automatic bank connection?",
          a: "Not at the moment. Mizara works with files you import yourself.",
        },
        {
          q: "What do I do with a payment that doesn't belong anywhere?",
          a: "You can deliberately leave a line unbooked, with a reason. That keeps it visible why your balance and your books differ at that point.",
        },
      ],
      related: [
        { href: "/functies/facturen", label: "Invoices and payments" },
        { href: "/functies/kosten", label: "Expenses and receipts" },
        { href: "/faq", label: "All questions" },
      ],
    },
    belastingoverzicht: {
      slug: "belastingoverzicht",
      nav: "Tax overview",
      summary: "What to set aside for VAT, income tax and Zvw, with an explanation of how the amount is built.",
      meta: {
        title: "Tax overview: how much to set aside for the Belastingdienst",
        description:
          "Mizara estimates from your bookings what to set aside for VAT, income tax and Zvw, with a 2% margin. Explained, without pretending to be advice.",
      },
      h1: "How much to set aside for the Belastingdienst, at any moment",
      lead: "After every invoice and every expense you see what to set aside for VAT, income tax and Zvw. It's an estimate, and Mizara shows how it's built.",
      highlights: [
        { title: "VAT per quarter", text: "VAT on your invoices minus VAT on your expenses, for the current quarter." },
        { title: "Income tax and Zvw for the year", text: "On your profit so far, with deductions and tax credits." },
        { title: "2% margin", text: "A small buffer on top of income tax and Zvw." },
      ],
      sections: [
        {
          id: "bedrag",
          title: "How the amount is calculated",
          blocks: [
            {
              kind: "p",
              text: "The amount at the top of your overview has two parts. Mizara adds them up and rounds up to whole euros.",
            },
            {
              kind: "ol",
              items: [
                "**VAT for the current quarter.** VAT on your invoices minus VAT on your expenses. If you'd get money back on balance, that doesn't count towards the amount.",
                "**Income tax and Zvw for this year.** Mizara calculates your profit so far, subtracts the self-employed deduction, starter deduction and SME profit exemption if you qualify, applies the rates and tax credits and adds the Zvw contribution. A 2% margin goes on top.",
              ],
            },
            {
              kind: "p",
              text: "A worked example is in [how much tax to set aside](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
        {
          id: "profiel",
          title: "Your tax profile",
          blocks: [
            {
              kind: "p",
              text: "The more accurate your profile, the better the estimate. In Mizara you indicate, among other things, whether you meet the hours criterion, whether you get the starter deduction and whether you use the small business scheme (KOR).",
            },
          ],
        },
        {
          id: "grenzen",
          title: "What it doesn't include",
          blocks: [
            {
              kind: "callout",
              tone: "warn",
              title: "An estimate, not an assessment",
              text: "Included: business profit. Not included: tax partnership and allocation, box 2, loss relief and refunds. If you also have a salary, your own home or savings in box 3, your actual tax may differ.",
            },
            {
              kind: "p",
              text: "You only learn your final income tax after filing your return. If you have a provisional assessment (voorlopige aanslag), you're already paying part of it. If it doesn't match what you expect, you can change it in Mijn Belastingdienst.",
            },
          ],
        },
        {
          id: "aangifte",
          title: "From overview to tax return",
          blocks: [
            {
              kind: "p",
              text: "For your VAT return, Mizara prepares the amounts per box. Figures for the EC sales list (ICP) and your income tax are ready too. You file them yourself, with the Belastingdienst.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "How accurate is the estimate?",
          a: "As accurate as your bookings and your profile. Mizara uses the tax year's rates, but doesn't know your whole situation. Use it as a guide and check your return yourself or with your accountant.",
        },
        {
          q: "Does Mizara account for what I'll earn in the rest of the year?",
          a: "No. The amount is based on your bookings so far. You set aside for what you've already earned, not for a forecast.",
        },
        {
          q: "Why a 2% margin?",
          a: "It absorbs small differences in rounding, rates or a forgotten item. It's a small buffer, not a guaranteed upper limit.",
        },
      ],
      related: [
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "How much tax to set aside?" },
        { href: "/kennisbank/inkomstenbelasting-zzp", label: "Income tax" },
        { href: "/demo", label: "See the set-aside in the demo" },
      ],
    },
  },
};

import type { Dict } from "../types";

export const pricing: Dict["pricing"] = {
  meta: {
    title: "Pricing: start free, plans from {facturen} a month",
    description:
      "What does Mizara cost? Free for up to {limit} invoices a month. Invoicing {facturen}, Bookkeeping {boekhouden} and Bookkeeping BV {boekhouden_bv} a month excl. VAT. Pay yearly and you pay for 10 months.",
  },
  h1: "Start free. Pay only when you need more.",
  lead: "Invoicing is free. If you also want to keep track of your expenses, bank statements and tax return figures, pick a plan. Cancel monthly, and you can always export your data.",
  plansTitle: "Plans",
  recommended: "Recommended for freelancers",
  perMonth: "a month",
  exVat: "excl. VAT",
  inclVat: "{price} incl. VAT",
  perYear: "Or {price} a year: 2 months free",
  freeForever: "For as long as you like",
  freeLimit: "Up to {limit} sent invoices a month",
  startFree: "Start free",
  startWith: "Start with {plan}",
  plans: {
    free: {
      name: "Free",
      tagline: "To get started with invoicing",
      features: ["Up to {limit} sent invoices a month", "Keep track of clients and products"],
    },
    facturen: {
      name: "Invoicing",
      tagline: "For freelancers who mostly send invoices",
      features: ["Unlimited invoices and quotes", "Recurring invoices", "Time tracking"],
    },
    boekhouden: {
      name: "Bookkeeping",
      tagline: "Complete bookkeeping for your sole proprietorship",
      features: ["Everything in Invoicing", "Expenses and receipts", "Bank import and ledger", "Figures for your VAT and income tax returns"],
    },
    boekhouden_bv: {
      name: "Bookkeeping BV",
      tagline: "Bookkeeping and annual accounts for your BV",
      features: ["Everything in Bookkeeping", "Figures for your corporate income tax", "Annual accounts"],
    },
  },
  trial: {
    title: "Just registered with the KVK? Then Mizara is free for up to six months.",
    text: "Enter your KVK number in your business details. If your business was registered less than 6 months ago, you use Mizara for free until 6 months after your registration date, with everything in Bookkeeping BV. After that you go back to Free, unless you choose a plan yourself. This works once per KVK number.",
  },
  compare: {
    title: "Compare plans",
    caption: "What each plan includes",
    feature: "Feature",
    rows: {
      invoices: "Sending invoices",
      recurring: "Recurring invoices",
      time: "Time tracking",
      costs: "Expenses and receipts",
      bank: "Bank import (MT940 and CAMT.053)",
      ledger: "Ledger",
      taxFigures: "Figures for VAT and income tax returns",
      vpb: "Figures for corporate income tax",
      jaarrekening: "Annual accounts",
    },
    limit: "Up to {limit} a month",
    unlimited: "Unlimited",
    included: "Included",
    notIncluded: "Not included",
  },
  notes: {
    title: "Good to know",
    items: [
      "Prices exclude 21% Dutch VAT. Plans are for businesses established in the Netherlands.",
      "Paying monthly means you can cancel monthly. Your plan runs until the end of the period you've already paid for.",
      "Paying yearly costs 10 months. You can switch to monthly once your year is over.",
      "Moving to a bigger plan works right away; whatever is left of your current period is credited. A smaller plan starts with your next period.",
      "You pay through Mollie. An invoice for every payment is ready for you in the app.",
      "Your data stays available and exportable, also when you switch or cancel.",
    ],
  },
  accountant:
    "**Are you an accountant?** With the firm licence all your clients work on the top plan, from {firm} a month excl. VAT. Email [support@mizara.app](mailto:support@mizara.app) to talk about the options.",
  faqTitle: "Questions about pricing",
  faq: [
    {
      q: "Can I use Mizara for free?",
      a: "Yes. On Free you send up to {limit} invoices a month and keep track of clients and products. For unlimited invoicing, expenses, bank import and your tax return figures, you pick a plan.",
    },
    {
      q: "Do I need to add a payment method to get started?",
      a: "No. You start on Free, or in your trial if your business was just registered. You only pay when you choose a plan yourself.",
    },
    {
      q: "What happens when my trial ends?",
      a: "You go back to Free, unless you choose a plan. Nothing is charged automatically and your bookings are kept.",
    },
    {
      q: "Which plan fits me?",
      a: "If you mostly send invoices and someone else does your bookkeeping, Invoicing is enough. If you run a sole proprietorship and track your own expenses, bank and tax figures, choose Bookkeeping. With a BV you need Bookkeeping BV.",
    },
    {
      q: "Can I cancel?",
      a: "Yes, in the app. Your plan runs until the end of the paid period and then moves to Free. You can always export your data.",
    },
    {
      q: "Is a plan tax deductible?",
      a: "A Mizara plan is a business expense. If you charge VAT, you can usually reclaim the VAT as input tax. If in doubt, ask your accountant.",
    },
  ],
  home: {
    kicker: "Pricing",
    title: "What Mizara costs",
    lead: "Invoicing is free. Your complete bookkeeping costs {boekhouden} a month excl. VAT, cancel monthly.",
    more: "Compare all plans",
  },
};

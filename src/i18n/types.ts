/**
 * Content model. Every string here is rendered on the server, so all copy is in the HTML
 * before any script runs. Inline strings support `[label](/path)` links (internal paths
 * get the locale prefix) and `**bold**`.
 */
import type { PlanFeature, PlanId } from "@/lib/pricing";

export type Inline = string;

export type Block =
  | { kind: "p"; text: Inline }
  | { kind: "ul" | "ol"; items: Inline[] }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][]; numericCols?: number[] }
  | { kind: "callout"; tone: "note" | "warn"; title?: string; text: Inline }
  | {
      kind: "calc";
      title: string;
      rows: { label: string; value: string; strong?: boolean; sign?: "minus" | "plus" }[];
      note?: Inline;
    };

export type Section = { id: string; title: string; blocks: Block[] };

export type PageMeta = { title: string; description: string };

export type QA = { q: string; a: Inline };

export type FeatureSlug = "facturen" | "kosten" | "bank" | "belastingoverzicht";

export type FeaturePage = {
  slug: FeatureSlug;
  nav: string;
  summary: string;
  meta: PageMeta;
  h1: string;
  lead: string;
  highlights: { title: string; text: Inline }[];
  sections: Section[];
  faq: QA[];
  related: { href: string; label: string }[];
};

export type ArticleSlug =
  | "hoeveel-belasting-apart-zetten-zzp"
  | "btw-berekenen-zzp"
  | "inkomstenbelasting-zzp"
  | "kor-regeling";

export type Article = {
  slug: ArticleSlug;
  meta: PageMeta;
  h1: string;
  lead: string;
  shortAnswer: Inline;
  readMinutes: number;
  sections: Section[];
  sources: { label: string; href: string }[];
  related: { href: string; label: string }[];
};

export type LegalDoc = {
  meta: PageMeta;
  h1: string;
  updated: string;
  intro: Inline;
  sections: Section[];
};

export type ProductScene = {
  id: "invoices" | "expenses" | "bank" | "tax";
  tab: string;
  title: string;
  text: Inline;
  points: string[];
  href: string;
  linkLabel: string;
};

export type Dict = {
  common: {
    siteDescription: string;
    nav: {
      home: string;
      features: string;
      audience: string;
      demo: string;
      kb: string;
      faq: string;
      pricing: string;
      menu: string;
      closeMenu: string;
      primary: string;
      allFeatures: string;
    };
    cta: {
      signup: string;
      demo: string;
      demoShort: string;
      login: string;
      createOwn: string;
    };
    a11y: { skip: string; theme: string; language: string; breadcrumb: string; switchTo: string };
    footer: {
      tagline: string;
      product: string;
      learn: string;
      company: string;
      legal: string;
      contact: string;
      appPrivacy: string;
      appTerms: string;
      dpa: string;
      privacy: string;
      terms: string;
      note: string;
      rights: string;
    };
    tax: {
      disclaimer: string;
      scope: string;
      demoBadge: string;
      taxYear: string;
    };
    labels: {
      reviewed: string;
      taxYear: string;
      sources: string;
      related: string;
      shortAnswer: string;
      onThisPage: string;
      minutes: string;
      questions: string;
      updated: string;
      readArticle: string;
      learnMore: string;
    };
    notFound: { title: string; body: string; home: string };
  };
  home: {
    meta: PageMeta;
    hero: {
      line1: string;
      line2: string;
      lead: string;
      note: string;
      visualLabel: string;
    };
    breakdown: {
      kicker: string;
      title: string;
      lead: string;
      rows: { billed: [string, string]; vat: [string, string]; revenue: [string, string]; ibZvw: [string, string]; keep: [string, string] };
      whyTitle: string;
      whyText: string;
      fiction: string;
    };
    unify: {
      kicker: string;
      title: string;
      lead: string;
      fragments: { invoice: string; receipt: string; statement: string; sheet: string };
    };
    tour: { kicker: string; title: string; lead: string; scenes: ProductScene[] };
    enter: { kicker: string; title: string; lead: string };
    reveal: {
      kicker: string;
      title: string;
      lead: string;
      roundNote: string;
      howTitle: string;
      howSteps: Inline[];
    };
    imports: { title: string; text: string };
    honest: { title: string; lead: string; items: { title: string; text: Inline }[] };
    faqTitle: string;
    faqMore: string;
    final: { title: string; text: string };
  };
  ui: {
    nav: string[];
    overview: string;
    revenueYtd: string;
    costsYtd: string;
    profitYtd: string;
    openInvoices: string;
    reserveLabel: string;
    reserveBadge: string;
    btwQuarter: string;
    ibZvwYear: string;
    invoice: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    billTo: string;
    description: string;
    quantity: string;
    amount: string;
    subtotal: string;
    vat: string;
    total: string;
    paid: string;
    open: string;
    expense: string;
    vendor: string;
    category: string;
    date: string;
    confirmed: string;
    toCheck: string;
    bankImport: string;
    matched: string;
    suggestion: string;
    statementFile: string;
    taxOverview: string;
    keep: string;
    fiction: string;
    ownTransfer: string;
    phoneProvider: string;
    receipt: string;
    paymentTerm: string;
    sources: string;
    sampleInvoice: string;
    sampleReceipt: string;
    officeCategory: string;
  };
  demo: {
    meta: PageMeta;
    h1: string;
    lead: string;
    profileTitle: string;
    profile: string[];
    privacyNote: string;
    loading: string;
    steps: { invoice: string; expense: string; overview: string; sandbox: string };
    stepOf: string;
    next: string;
    back: string;
    invoice: {
      title: string;
      text: string;
      client: string;
      description: string;
      amount: string;
      amountHelp: string;
      amountError: string;
      vatRate: string;
      vatHelp: Record<"21" | "9" | "0", string>;
      preview: string;
      create: string;
    };
    expense: {
      title: string;
      text: string;
      receiptTitle: string;
      readNote: string;
      vendor: string;
      date: string;
      total: string;
      vatRate: string;
      category: string;
      confirm: string;
      confirmHelp: string;
      categories: Record<"office" | "software" | "travel" | "phone" | "insurance" | "education" | "marketing" | "other", string>;
      scanning: string;
      checkPrompt: string;
    };
    overview: {
      title: string;
      text: string;
      omzet: string;
      kosten: string;
      winst: string;
      btw: string;
      btwHelp: string;
      ibZvw: string;
      ibZvwHelp: string;
      reserve: string;
      keep: string;
      keepHelp: string;
      change: string;
      assumptionsTitle: string;
      assumptions: string[];
      detailsTitle: string;
      details: {
        winst: string;
        zelfstandigenaftrek: string;
        startersaftrek: string;
        mkb: string;
        belastbaar: string;
        box1: string;
        ahk: string;
        arbeidskorting: string;
        tariefbeperking: string;
        ib: string;
        zvw: string;
        buffer: string;
        outputBtw: string;
        inputBtw: string;
      };
      kor: string;
    };
    sandbox: {
      title: string;
      text: string;
      invoices: string;
      expenses: string;
      addInvoice: string;
      addExpense: string;
      remove: string;
      locked: string;
      reset: string;
      starter: string;
      starterHelp: string;
      uren: string;
      urenHelp: string;
      empty: string;
      announce: string;
    };
    result: { title: string; text: string };
  };
  features: {
    hub: { meta: PageMeta; h1: string; lead: string; extrasTitle: string; extras: { title: string; text: string }[] };
    pages: Record<FeatureSlug, FeaturePage>;
  };
  audience: {
    meta: PageMeta;
    h1: string;
    lead: string;
    fits: { title: string; items: string[] };
    notFits: { title: string; items: Inline[] };
    sections: Section[];
  };
  faq: { meta: PageMeta; h1: string; lead: string; groups: { title: string; items: QA[] }[] };
  kb: {
    hub: { meta: PageMeta; h1: string; lead: string; note: Inline };
    reviewed: string;
    articles: Record<ArticleSlug, Article>;
  };
  legal: { privacy: LegalDoc; terms: LegalDoc };
  pricing: Pricing;
};

/** `{price}` and `{limit}` are filled in from src/lib/pricing.ts, so amounts live in one place. */
export type Pricing = {
  meta: PageMeta;
  h1: string;
  lead: string;
  plansTitle: string;
  recommended: string;
  perMonth: string;
  exVat: string;
  inclVat: string;
  perYear: string;
  freeForever: string;
  freeLimit: string;
  startFree: string;
  startWith: string;
  plans: Record<PlanId, { name: string; tagline: string; features: string[] }>;
  trial: { title: string; text: Inline };
  compare: {
    title: string;
    caption: string;
    feature: string;
    rows: Record<PlanFeature, string>;
    limit: string;
    unlimited: string;
    included: string;
    notIncluded: string;
  };
  notes: { title: string; items: Inline[] };
  accountant: Inline;
  faqTitle: string;
  faq: QA[];
  home: { kicker: string; title: string; lead: string; more: string };
};

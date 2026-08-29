export type FeatureItem = { title: string; body: string };
export type StepItem = { title: string; body: string };
export type FaqItem = { q: string; a: string };

export type Dict = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    tagline: string;
    waitlistCta: string;
    signIn: string;
    themeToggle: string;
    langLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    subhead: string;
    formNote: string;
    signInPrompt: string;
    reserveLabel: string;
    reserveCaption: string;
    reserveParts: { label: string; amount: string }[];
  };
  trust: string[];
  reserve: {
    eyebrow: string;
    title: string;
    body: string;
    caveat: string;
    points: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: FeatureItem[];
  };
  how: {
    eyebrow: string;
    title: string;
    steps: StepItem[];
  };
  privacy: {
    eyebrow: string;
    title: string;
    points: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    body: string;
  };
  footer: {
    blurb: string;
    privacy: string;
    terms: string;
    contact: string;
    signIn: string;
    rights: string;
  };
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    errorEmail: string;
    errorRate: string;
  };
  legal: {
    privacyTitle: string;
    privacyBody: string;
    termsTitle: string;
    termsBody: string;
    back: string;
  };
};

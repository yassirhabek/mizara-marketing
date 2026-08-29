import type { Dict } from "./types";

export const nl: Dict = {
  meta: {
    title: "Mizara — ZZP-boekhouding",
    description:
      "Boekhouding voor Nederlandse zzp'ers: facturen, bonnetjes en een live schatting van wat je reserveert voor de Belastingdienst. Schrijf je in voor de private bèta.",
  },
  nav: {
    tagline: "ZZP-boekhouding",
    roadmap: "Roadmap",
    waitlistCta: "Op de wachtlijst",
    signIn: "Inloggen",
    themeToggle: "Wissel tussen licht en donker",
    langLabel: "Taal",
  },
  hero: {
    badge: "Private bèta · binnenkort",
    title: "Je belastingpotje, altijd up-to-date.",
    subhead:
      "Mizara is boekhouding voor Nederlandse zzp'ers. Facturen, bonnetjes en een live schatting van wat je opzij moet zetten voor de Belastingdienst — btw, inkomstenbelasting en Zvw.",
    formNote: "Geen spam. Eén mail als we live gaan.",
    signInPrompt: "Al een account? Inloggen",
    reserveLabel: "Reserveer voor de Belastingdienst",
    reserveCaption: "Geschatte reservering voor 2026 op basis van je boekingen.",
    reserveParts: [
      { label: "Btw", amount: "€ 2.140" },
      { label: "Inkomstenbelasting", amount: "€ 2.058" },
      { label: "Zvw", amount: "€ 614" },
    ],
  },
  trust: [
    "2026-tarieven van de Belastingdienst",
    "Btw én KOR",
    "Export wanneer je wilt",
    "Hosting in de EU",
  ],
  reserve: {
    eyebrow: "De kern",
    title: "Nooit meer schrikken van de aanslag.",
    body: "Elke factuur en elke bon past het bedrag aan. Per kwartaal zie je btw, inkomstenbelasting (box 1) en Zvw apart, met een kleine veiligheidsmarge. Geld dat je niet mag uitgeven staat zwart-op-wit apart.",
    caveat:
      "Mizara maakt een schatting en zet je aangifte klaar — indienen doe je zelf. Loon uit dienstverband, box 2/3 en hypotheekrente vallen erbuiten; twijfel je, check je aangifte of je accountant.",
    points: [
      "Live bijgewerkt na elke boeking",
      "Per kwartaal uitgesplitst",
      "Inclusief kleine veiligheidsmarge",
    ],
  },
  features: {
    eyebrow: "Wat je krijgt",
    title: "Alles voor je administratie, niets teveel.",
    items: [
      {
        title: "Facturen & offertes",
        body: "Genummerde facturen als pdf, versturen per e-mail, offertes met digitale handtekening en terugkerende facturen.",
      },
      {
        title: "Bonnetjes met OCR",
        body: "Foto of pdf erin; Mizara leest bedrag en btw voor. Jij bevestigt vóór het opslaan.",
      },
      {
        title: "Btw- & IB-aangifte voorbereid",
        body: "Rubrieken voor je kwartaalaangifte en een box 1-overzicht voor de jaaraangifte, als pdf.",
      },
      {
        title: "Overstappen is simpel",
        body: "Importeer uit Moneybird, e-Boekhouden, Exact Online of een CSV/Excel-bestand.",
      },
      {
        title: "KOR of gewone btw",
        body: "Werk met de kleineondernemersregeling inclusief drempelmeter, of gewoon met 21/9/0%.",
      },
      {
        title: "Je accountant erbij",
        body: "Nodig je boekhouder uit met alleen-lezen toegang tot je administratie.",
      },
    ],
  },
  how: {
    eyebrow: "Zo werkt het",
    title: "Van boeking tot aangifte in drie stappen.",
    steps: [
      {
        title: "Boek omzet en kosten in",
        body: "Facturen maak je in Mizara; bonnetjes sleep je erin.",
      },
      {
        title: "Zie je potje meegroeien",
        body: "Na elke boeking staat er een actueel bedrag klaar om te reserveren.",
      },
      {
        title: "Aangifte in tien minuten",
        body: "Download de voorbereide rubrieken en neem ze over bij de Belastingdienst.",
      },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "Wat er is, en wat eraan komt.",
    description:
      "Mizara is in private bèta. De basis staat; hieronder zie je waar we nu aan werken en wat op de planning staat.",
    columns: [
      {
        status: "shipped",
        label: "Nu in de bèta",
        items: [
          "Facturen, offertes met digitale handtekening en terugkerende facturen",
          "Bonnetjes met AI-herkenning (OCR), altijd met jouw bevestiging",
          "Live belastingreservering: btw, inkomstenbelasting en Zvw",
          "Btw-aangifte en IB-jaaroverzicht als pdf",
          "KOR met drempelmeter, of gewone btw (21/9/0%)",
          "iDEAL-betaallinks via Mollie",
          "Import uit Moneybird, e-Boekhouden, Exact Online en CSV/Excel",
          "Accountant uitnodigen met alleen-lezen toegang",
          "Volledige data-export (csv)",
        ],
      },
      {
        status: "building",
        label: "In ontwikkeling",
        items: [
          "Bankkoppeling: transacties automatisch inladen en matchen",
          "Slimmer categoriseren van kosten",
          "Kilometer- en reiskostenregistratie",
          "Mobiele ervaring verder verfijnen",
        ],
      },
      {
        status: "planned",
        label: "Op de planning",
        items: [
          "Urenregistratie met urencriterium-teller",
          "Herinneringen voor aangifte- en betaaldeadlines",
          "Jaarrapportage exporteren voor je accountant",
          "Meerdere administraties onder één account",
          "Koppelingen via een API",
        ],
      },
    ],
    footnote:
      "Deze roadmap geeft richting, geen garanties. Volgorde en timing kunnen veranderen.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Jouw cijfers blijven van jou.",
    points: [
      "Geen marketingprofielen",
      "OCR is optioneel en altijd met jouw bevestiging",
      "Volledige export (csv) en verwijderen wanneer je wilt",
      "Database en hosting binnen de EU",
      "Geen automatische koppeling met de Belastingdienst",
    ],
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: "Nog even dit.",
    items: [
      {
        q: "Is Mizara een boekhouder?",
        a: "Nee. Mizara is software die je boekhouding bijhoudt en je aangifte voorbereidt. Voor advies of controle nodig je je eigen accountant uit.",
      },
      {
        q: "Doet Mizara mijn belastingaangifte?",
        a: "Mizara zet de cijfers en rubrieken klaar. Indienen doe je zelf bij de Belastingdienst — bewust, geen automatische koppeling.",
      },
      {
        q: "Wat kost het?",
        a: "Dat maken we bekend bij de lancering. Wachtlijst-leden horen het als eerste en krijgen een introprijs.",
      },
      {
        q: "Voor wie is het?",
        a: "Nederlandse zzp'ers met één administratie: eenmanszaak, freelancer, starter. Loon uit dienstverband, box 2 en box 3 vallen erbuiten.",
      },
      {
        q: "Kan ik mijn data importeren?",
        a: "Ja, uit Moneybird, e-Boekhouden, Exact Online of een CSV/Excel-bestand.",
      },
      {
        q: "Waar staat mijn data?",
        a: "In een database binnen de EU. Je kunt alles exporteren of je account verwijderen wanneer je wilt.",
      },
    ],
  },
  cta: {
    title: "Als eerste Mizara proberen?",
    body: "Schrijf je in voor de wachtlijst. We nodigen wachtlijst-leden als eerste uit voor de private bèta.",
  },
  footer: {
    blurb: "Boekhouding voor Nederlandse zzp'ers.",
    privacy: "Privacy",
    terms: "Voorwaarden",
    contact: "Contact",
    signIn: "Inloggen",
    rights: "© 2026 Mizara",
  },
  form: {
    emailLabel: "E-mailadres",
    emailPlaceholder: "jij@voorbeeld.nl",
    submit: "Zet me op de lijst",
    submitting: "Bezig…",
    successTitle: "Je staat op de lijst.",
    successBody: "Check je mail voor de bevestiging.",
    errorGeneric: "Er ging iets mis. Probeer het zo nog eens.",
    errorEmail: "Vul een geldig e-mailadres in.",
    errorRate: "Even wachten en opnieuw proberen.",
  },
  legal: {
    privacyTitle: "Privacy",
    privacyBody:
      "Deze pagina verzamelt alleen het e-mailadres dat je op de wachtlijst achterlaat, plus je taalkeuze en technische gegevens (IP-adres, browser) om misbruik tegen te gaan. We gebruiken het adres uitsluitend om je één keer uit te nodigen voor de private bèta. Je kunt je op elk moment afmelden via de link in de bevestigingsmail. Bij de lancering volgt een volledige privacyverklaring voor het product zelf.",
    termsTitle: "Voorwaarden",
    termsBody:
      "Mizara is nog in private bèta. Inschrijven op de wachtlijst geeft geen recht op toegang, een prijs of een lanceerdatum. We kunnen de dienst en deze pagina wijzigen of stopzetten. Volledige gebruiksvoorwaarden volgen bij de lancering.",
    back: "Terug naar home",
  },
};

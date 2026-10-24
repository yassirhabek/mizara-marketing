import type { Dict } from "../types";

export const pricing: Dict["pricing"] = {
  meta: {
    title: "Prijzen: gratis beginnen, abonnementen vanaf {facturen} per maand",
    description:
      "Wat kost Mizara? Gratis voor tot {limit} facturen per maand. Facturen {facturen}, Boekhouden {boekhouden} en Boekhouden BV {boekhouden_bv} per maand excl. btw. Per jaar betaal je 10 maanden.",
  },
  h1: "Begin gratis. Betaal pas als je meer nodig hebt.",
  lead: "Factureren kan gratis. Wil je ook je kosten, bankafschrift en aangiftecijfers bijhouden, dan kies je een abonnement. Maandelijks opzegbaar, en je gegevens kun je altijd exporteren.",
  plansTitle: "Abonnementen",
  recommended: "Aanbevolen",
  perMonth: "per maand",
  exVat: "excl. btw",
  inclVat: "{price} incl. btw",
  perYear: "Of {price} per jaar: 2 maanden gratis",
  freeForever: "Zo lang je wilt",
  freeLimit: "Tot {limit} verstuurde facturen per maand",
  startFree: "Begin gratis",
  startWith: "Begin met {plan}",
  choose: "Kies {plan}",
  plans: {
    free: {
      name: "Gratis",
      tagline: "Om te beginnen met factureren",
      features: ["Tot {limit} verstuurde facturen per maand", "Klanten en producten bijhouden"],
    },
    facturen: {
      name: "Facturen",
      tagline: "Voor wie vooral factureert",
      features: ["Onbeperkt facturen en offertes", "Periodieke facturen", "Urenregistratie"],
    },
    boekhouden: {
      name: "Boekhouden",
      tagline: "De complete boekhouding voor je eenmanszaak",
      features: ["Alles van Facturen", "Kosten en bonnetjes", "Bankimport en grootboek", "Cijfers voor je btw- en IB-aangifte"],
    },
    boekhouden_bv: {
      name: "Boekhouden BV",
      tagline: "Boekhouden en jaarstukken voor je bv",
      features: ["Alles van Boekhouden", "Cijfers voor je vennootschapsbelasting", "Jaarrekening"],
    },
  },
  trial: {
    title: "Net ingeschreven bij de KVK? Dan is Mizara tot een half jaar gratis.",
    text: "Vul je KVK-nummer in bij je bedrijfsgegevens. Is je bedrijf minder dan 6 maanden geleden ingeschreven, dan gebruik je Mizara gratis tot 6 maanden na je inschrijfdatum, met alles van Boekhouden BV. Daarna ga je terug naar Gratis, tenzij je zelf een abonnement kiest. Dit kan één keer per KVK-nummer.",
  },
  compare: {
    title: "Vergelijk de abonnementen",
    caption: "Wat er in elk abonnement zit",
    feature: "Functie",
    rows: {
      invoices: "Facturen versturen",
      recurring: "Periodieke facturen",
      time: "Urenregistratie",
      costs: "Kosten en bonnetjes",
      bank: "Bankimport (MT940 en CAMT.053)",
      ledger: "Grootboek",
      taxFigures: "Cijfers voor btw- en IB-aangifte",
      vpb: "Cijfers voor vennootschapsbelasting",
      jaarrekening: "Jaarrekening",
    },
    limit: "Tot {limit} per maand",
    unlimited: "Onbeperkt",
    included: "Inbegrepen",
    notIncluded: "Niet inbegrepen",
  },
  notes: {
    title: "Goed om te weten",
    items: [
      "Prijzen zijn exclusief 21% btw. Abonnementen zijn voor ondernemers die in Nederland gevestigd zijn.",
      "Per maand betalen is maandelijks opzegbaar. Je abonnement loopt door tot het einde van de periode die je al betaald hebt.",
      "Per jaar betaal je 10 maanden. Overstappen naar maandelijks kan zodra je jaar is afgelopen.",
      "Overstappen naar een groter abonnement kan meteen; wat je van je huidige periode nog tegoed hebt, wordt verrekend. Een kleiner abonnement gaat in bij je volgende periode.",
      "Je betaalt via Mollie. Voor elke betaling staat een factuur voor je klaar in de app.",
      "Je gegevens blijven beschikbaar en te exporteren, ook als je overstapt of opzegt.",
    ],
  },
  accountant:
    "**Ben je accountant?** Met de kantoorlicentie werken al je klanten op het hoogste abonnement, vanaf {firm} per maand excl. btw. Mail [support@mizara.nl](mailto:support@mizara.nl) voor de mogelijkheden.",
  faqTitle: "Vragen over prijzen",
  faq: [
    {
      q: "Kan ik Mizara gratis gebruiken?",
      a: "Ja. Met Gratis verstuur je tot {limit} facturen per maand en houd je klanten en producten bij. Voor onbeperkt factureren, kosten, bankimport en je aangiftecijfers kies je een abonnement.",
    },
    {
      q: "Moet ik een betaalmethode opgeven om te beginnen?",
      a: "Nee. Je begint op Gratis, of in je proefperiode als je bedrijf net is ingeschreven. Je rekent pas af als je zelf een abonnement kiest.",
    },
    {
      q: "Wat gebeurt er als mijn proefperiode afloopt?",
      a: "Je gaat terug naar Gratis, tenzij je een abonnement kiest. Er wordt niets automatisch afgeschreven en je boekingen blijven bewaard.",
    },
    {
      q: "Welk abonnement past bij mij?",
      a: "Stuur je vooral facturen en doet iemand anders je boekhouding, dan is Facturen genoeg. Houd je met een eenmanszaak zelf je kosten, bank en aangiftecijfers bij, kies dan Boekhouden. Met een bv heb je Boekhouden BV nodig.",
    },
    {
      q: "Kan ik opzeggen?",
      a: "Ja, in de app. Je abonnement loopt door tot het einde van de betaalde periode en gaat daarna naar Gratis. Je gegevens kun je altijd exporteren.",
    },
    {
      q: "Is een abonnement aftrekbaar?",
      a: "Een Mizara-abonnement is een zakelijke kost. Ben je btw-plichtig, dan kun je de btw meestal als voorbelasting aftrekken. Twijfel je, vraag het je accountant.",
    },
  ],
  home: {
    kicker: "Prijzen",
    title: "Wat Mizara kost",
    lead: "Factureren kan gratis. Je complete boekhouding kost {boekhouden} per maand excl. btw, maandelijks opzegbaar.",
    more: "Vergelijk alle abonnementen",
  },
};

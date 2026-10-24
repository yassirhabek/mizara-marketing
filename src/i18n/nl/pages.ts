import type { Dict } from "../types";
import { appUrl } from "@/lib/env";

export const audience: Dict["audience"] = {
  meta: {
    title: "Boekhouding voor zzp'ers en eenmanszaken",
    description:
      "Mizara is gemaakt voor zzp'ers met een eenmanszaak die zelf hun administratie doen en willen weten wat ze kunnen uitgeven. Lees voor wie het past en voor wie niet.",
  },
  h1: "Voor zzp'ers die zelf hun administratie doen",
  lead: "Je bent ontwerper, ontwikkelaar, coach, fotograaf of vakman. Je stuurt facturen, maakt kosten en wilt niet elk kwartaal schrikken. Daar is Mizara voor.",
  fits: {
    title: "Mizara past bij je als",
    items: [
      "je een eenmanszaak hebt en ondernemer bent voor de inkomstenbelasting",
      "je je administratie zelf bijhoudt, eventueel met een accountant die meekijkt",
      "je per kwartaal btw-aangifte doet of de KOR gebruikt",
      "je wilt weten wat je opzij moet zetten zonder zelf te rekenen",
      "je je facturen, bonnetjes en bankafschrift op één plek wilt hebben",
    ],
  },
  notFits: {
    title: "Kijk verder als",
    items: [
      "je een directe bankkoppeling wilt die alles automatisch ophaalt",
      "je een volledig fiscaal advies over je hele situatie zoekt; daarvoor heb je een accountant of belastingadviseur nodig",
      "je inkomstenbelasting sterk afhangt van zaken die de schatting niet meeneemt, zoals fiscaal partnerschap, box 2 of verliesverrekening",
    ],
  },
  sections: [
    {
      id: "starters",
      title: "Net begonnen",
      blocks: [
        {
          kind: "p",
          text: "In je eerste jaren heb je vaak recht op startersaftrek, en je weet nog niet goed wat je verdient. Juist dan helpt het om na elke factuur te zien wat je moet reserveren. Lees ook [inkomstenbelasting als zzp'er](/kennisbank/inkomstenbelasting-zzp).",
        },
      ],
    },
    {
      id: "kor",
      title: "Kleine omzet, KOR",
      blocks: [
        {
          kind: "p",
          text: "Gebruik je de kleineondernemersregeling, dan reken je geen btw. Mizara houdt bij hoe dicht je bij de grens van €20.000 zit. Lees meer over [de KOR](/kennisbank/kor-regeling).",
        },
      ],
    },
    {
      id: "groeiend",
      title: "Groeiende omzet",
      blocks: [
        {
          kind: "p",
          text: "Hoe meer je verdient, hoe groter het deel van elke extra euro dat naar de Belastingdienst gaat. Wie dan nog met een vast percentage reserveert, komt vaak tekort. Mizara rekent over je hele jaar. Waarom dat uitmaakt, staat in [hoeveel belasting apart zetten](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
        },
      ],
    },
    {
      id: "accountant",
      title: "Met een accountant",
      blocks: [
        {
          kind: "p",
          text: "Laat je je jaarafsluiting of aangifte doen door een accountant? Geef die toegang tot je administratie in Mizara. Jij boekt door het jaar heen, je accountant kijkt mee en controleert.",
        },
      ],
    },
    {
      id: "overstappen",
      title: "Overstappen",
      blocks: [
        {
          kind: "p",
          text: "Werk je nu met Moneybird, e-Boekhouden of Exact? Neem je gegevens mee, of importeer een CSV- of XAF-bestand. Bekijk [alle functies](/functies) of [probeer eerst de demo](/demo).",
        },
      ],
    },
  ],
};

export const faq: Dict["faq"] = {
  meta: {
    title: "Veelgestelde vragen over Mizara",
    description:
      "Antwoorden over Mizara: wat het doet, hoe de belastingschatting werkt, bankimport, bonnetjes uitlezen, je gegevens en overstappen.",
  },
  h1: "Veelgestelde vragen",
  lead: "Staat je vraag er niet bij? Mail naar [support@mizara.app](mailto:support@mizara.app).",
  groups: [
    {
      title: "Over Mizara",
      items: [
        {
          q: "Wat is Mizara?",
          a: "Online boekhoudsoftware voor Nederlandse zzp'ers. Je maakt facturen, boekt kosten, importeert je bankafschrift en ziet wat je reserveert voor btw, inkomstenbelasting en Zvw.",
        },
        {
          q: "Is Mizara een accountant?",
          a: "Nee. Mizara is software. Het rekent en zet cijfers klaar, maar geeft geen advies over je persoonlijke situatie.",
        },
        {
          q: "Voor wie is Mizara?",
          a: "Voor zzp'ers met een eenmanszaak die zelf hun administratie doen. Lees meer op [voor zzp'ers](/voor-zzpers).",
        },
        {
          q: "Kan ik Mizara uitproberen zonder account?",
          a: "Ja. De [interactieve demo](/demo) werkt in je browser met een fictieve zzp'er. Er wordt niets opgeslagen.",
        },
      ],
    },
    {
      title: "Belasting",
      items: [
        {
          q: "Hoe berekent Mizara wat ik moet reserveren?",
          a: "Het telt de btw van het lopende kwartaal op bij de inkomstenbelasting en Zvw over je winst van dit jaar tot nu toe, plus 2% marge, en rondt af naar boven. Zie [het belastingoverzicht](/functies/belastingoverzicht).",
        },
        {
          q: "Is de schatting belastingadvies?",
          a: "Nee. Het is een schatting op basis van je boekingen en je fiscaal profiel. Het is geen aangifte en geen belastingadvies. Controleer alles met je accountant of via Mijn Belastingdienst.",
        },
        {
          q: "Doet Mizara mijn aangifte?",
          a: "Mizara zet de cijfers voor je btw-aangifte, ICP-opgave en inkomstenbelasting klaar. Indienen doe je zelf bij de Belastingdienst.",
        },
        {
          q: "Wat neemt de schatting niet mee?",
          a: "Fiscaal partnerschap en verdeling, box 2, verliesverrekening en teruggaven. Heb je daarnaast loon, een eigen woning of vermogen, dan kan je werkelijke belasting afwijken.",
        },
        {
          q: "Ondersteunt Mizara de KOR?",
          a: "Ja. Je geeft in je profiel aan dat je de KOR gebruikt en ziet hoe dicht je bij de grens van €20.000 zit. Lees meer over [de KOR](/kennisbank/kor-regeling).",
        },
      ],
    },
    {
      title: "Bank en bonnetjes",
      items: [
        {
          q: "Is er een koppeling met mijn bank?",
          a: "Nee, er is geen directe bankkoppeling. Je importeert je afschrift als CAMT.053- of MT940-bestand. Zie [bankimport](/functies/bank).",
        },
        {
          q: "Welke bankbestanden werken?",
          a: "CAMT.053 (.xml) en MT940 (.mt940, .sta, .txt), voor rekeningen in euro.",
        },
        {
          q: "Leest Mizara mijn bonnetjes foutloos uit?",
          a: "Nee, en dat beloven we ook niet. Uitgelezen waarden zijn een voorstel. Je controleert ze en bevestigt zelf voordat er iets wordt geboekt.",
        },
      ],
    },
    {
      title: "Gegevens en overstappen",
      items: [
        {
          q: "Kan ik overstappen vanuit een ander pakket?",
          a: "Ja. Je kunt importeren uit Moneybird, e-Boekhouden en Exact, of een CSV- of XAF-bestand gebruiken.",
        },
        {
          q: "Kan ik mijn gegevens exporteren of mijn account verwijderen?",
          a: "Ja. Je kunt je gegevens exporteren en je account verwijderen vanuit de instellingen.",
        },
        {
          q: "Waar lees ik hoe Mizara met mijn gegevens omgaat?",
          a: `In de [privacyverklaring van de app](${appUrl}/privacy). Daar staan ook de partijen die gegevens voor Mizara verwerken.`,
        },
        {
          q: "Wat kost Mizara?",
          a: "Je kunt gratis beginnen met factureren. Voor je complete boekhouding kies je een abonnement, maandelijks opzegbaar. Alle bedragen staan op [prijzen](/prijzen).",
        },
      ],
    },
    {
      title: "Hulp",
      items: [
        {
          q: "Ik heb fiscale vragen over mijn situatie. Waar kan ik terecht?",
          a: "Bij de Belastingdienst, een accountant of een belastingadviseur. Mizara kan je cijfers helpen ordenen, maar beoordeelt je persoonlijke situatie niet. Je kunt je accountant toegang geven tot je administratie.",
        },
        {
          q: "Hoe bereik ik Mizara?",
          a: "Via [support@mizara.app](mailto:support@mizara.app).",
        },
      ],
    },
  ],
};

const APP = appUrl;

export const legal: Dict["legal"] = {
  privacy: {
    meta: {
      title: "Privacy op mizara.app",
      description: "Welke gegevens deze website verwerkt: alleen functionele cookies voor je taal en je inlogstatus, en je themavoorkeur. De demo draait volledig in je browser.",
    },
    h1: "Privacy op deze website",
    updated: "2026-10-24",
    intro: `Deze pagina gaat over de website mizara.app. Voor de app zelf, waar je administratie staat, geldt de [privacyverklaring van de app](${APP}/privacy).`,
    sections: [
      {
        id: "wat",
        title: "Wat deze website opslaat",
        blocks: [
          {
            kind: "ul",
            items: [
              "**Een taalcookie** (`locale`), zodat je de volgende keer in dezelfde taal terugkomt. Deze cookie is functioneel en blijft een jaar bewaard.",
              "**Een inlogcookie** (`mz_app`), die we zetten als je inlogt in de app en weghalen als je uitlogt, zodat het menu een link naar de app toont in plaats van de aanmeldknop. Er staat alleen de waarde `1` in, niet wie je bent, en hij blijft hooguit 30 dagen bewaard.",
              "**Je themavoorkeur** (licht of donker) in de lokale opslag van je browser. Die verlaat je apparaat niet.",
            ],
          },
          {
            kind: "p",
            text: "Deze website gebruikt geen advertentie- of trackingcookies en bouwt geen profielen op.",
          },
        ],
      },
      {
        id: "demo",
        title: "De interactieve demo",
        blocks: [
          {
            kind: "p",
            text: "De demo rekent volledig in je browser. Wat je invult, wordt niet naar ons of naar anderen verstuurd en niet opgeslagen. Ververs je de pagina, dan begin je opnieuw.",
          },
        ],
      },
      {
        id: "server",
        title: "Technische gegevens",
        blocks: [
          {
            kind: "p",
            text: "Zoals bij elke website ontvangt de server technische gegevens, zoals je IP-adres en browser, om pagina's te kunnen tonen en misbruik te voorkomen. Die gebruiken we niet om je te volgen.",
          },
        ],
      },
      {
        id: "contact",
        title: "Vragen",
        blocks: [
          {
            kind: "p",
            text: "Mail naar [privacy@mizara.app](mailto:privacy@mizara.app). Mizara B.V. is verantwoordelijk voor deze website.",
          },
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Gebruik van mizara.app",
      description: "Voorwaarden voor het gebruik van de website mizara.app, de kennisbank en de demo. Voor de app gelden de algemene voorwaarden van Mizara.",
    },
    h1: "Gebruik van deze website",
    updated: "2026-10-23",
    intro: `Deze voorwaarden gaan over de website mizara.app. Gebruik je de app, dan gelden de [algemene voorwaarden](${APP}/terms) en, waar van toepassing, de [verwerkersovereenkomst](${APP}/verwerkersovereenkomst).`,
    sections: [
      {
        id: "informatie",
        title: "Informatie op deze site",
        blocks: [
          {
            kind: "p",
            text: "We doen ons best om de uitleg in de kennisbank juist en actueel te houden, met verwijzingen naar de Belastingdienst. De informatie is algemeen en geen belastingadvies. Regels en bedragen veranderen; bij elk artikel staat wanneer we het voor het laatst hebben gecontroleerd.",
          },
        ],
      },
      {
        id: "demo",
        title: "Bedragen en de demo",
        blocks: [
          {
            kind: "p",
            text: "Alle bedragen op deze site en in de demo zijn voorbeelden met fictieve cijfers, berekend met vereenvoudigde aannames. Je kunt er geen rechten aan ontlenen en ze zijn niet bedoeld om je aangifte op te baseren.",
          },
        ],
      },
      {
        id: "aansprakelijkheid",
        title: "Aansprakelijkheid",
        blocks: [
          {
            kind: "p",
            text: "Mizara B.V. is niet aansprakelijk voor schade die ontstaat doordat je op de informatie op deze website vertrouwt. Controleer belangrijke beslissingen met de Belastingdienst of een adviseur.",
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

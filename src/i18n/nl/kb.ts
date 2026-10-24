import type { Dict } from "../types";
import { homeStory } from "@/lib/demo-tax/story";
import { LADDER_PROFITS, WORKED_PROFIT_CENTS, profitLadder, yearWithProfit } from "@/lib/demo-tax/examples";
import { formatEuro, formatEuroWhole, formatPercent } from "@/lib/money";

const e = (cents: number) => formatEuro(cents, "nl");
const w = (cents: number) => formatEuroWhole(cents, "nl");
const p = (rate: number) => formatPercent(Math.round(rate * 1000) / 1000, "nl");

const story = homeStory();
const s = story.after;
const ladder = profitLadder(LADDER_PROFITS);
const worked = yearWithProfit(WORKED_PROFIT_CENTS);
const workedStarter = yearWithProfit(WORKED_PROFIT_CENTS, { starter: true, urencriterium: true });

const BD = "https://www.belastingdienst.nl/wps/wcm/connect";
const src = {
  box1: { label: "Belastingdienst: Box 1, uitleg en tarieven", href: `${BD}/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1` },
  zelfstandigenaftrek: { label: "Belastingdienst: Zelfstandigenaftrek 2026", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026` },
  uren: { label: "Belastingdienst: Urencriterium", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/voorwaarden_urencriterium` },
  mkb: { label: "Belastingdienst: Mkb-winstvrijstelling 2026", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/mkb-winstvrijstelling-2026` },
  zvw: { label: "Belastingdienst: Percentages inkomensafhankelijke bijdrage Zvw", href: `${BD}/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/veranderingen-bijdrage-zvw/percentages-zvw` },
  voorlopig: { label: "Belastingdienst: Voorlopige aanslag controleren en wijzigen", href: `${BD}/nl/voorlopige-aanslag/content/in-welke-situaties-moet-ik-mijn-voorlopige-aanslag-wijzigen` },
  btwTarieven: { label: "Belastingdienst: Btw-tarieven", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief` },
  btwDatums: { label: "Belastingdienst: Uiterste datums btw-aangifte en betaling", href: `${BD}/nl/btw/content/uiterste-aangifte-en-betaaldatums` },
  btwAangifte: { label: "Belastingdienst: Btw-aangifte, waar moet u aan denken?", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/btw_aangifte_doen_en_betalen/btw-aangifte-waar-moet-u-aan-denken/btw-aangifte-waar-moet-u-aan-denken` },
  factuureisen: { label: "Belastingdienst: Factuureisen", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/facturen_maken/factuureisen/` },
  korVoorwaarden: { label: "Belastingdienst: Voorwaarden voor de KOR", href: `${BD}/nl/btw/content/kor-voorwaarden` },
  korAf: { label: "Belastingdienst: Afmelden voor de KOR", href: `${BD}/nl/btw/content/afmelden-kor` },
  korAan: { label: "Belastingdienst: Aanmelden voor de KOR", href: `${BD}/nl/btw/content/aanmelden-kor` },
  kvk: { label: "KVK: Belastingtarieven 2026 voor ondernemers", href: "https://www.kvk.nl/geldzaken/belastingtarieven-2026/" },
};

export const kb: Dict["kb"] = {
  hub: {
    meta: {
      title: "Kennisbank: belasting en administratie voor zzp'ers",
      description:
        "Heldere uitleg over btw, inkomstenbelasting, de KOR en hoeveel je opzij zet als zzp'er. Met rekenvoorbeelden voor 2026 en verwijzingen naar de Belastingdienst.",
    },
    h1: "Kennisbank voor zzp'ers",
    lead: "Antwoorden op de vragen die elke zzp'er een keer heeft, met rekenvoorbeelden voor belastingjaar 2026 en verwijzingen naar de bron.",
    note: "Deze artikelen leggen uit hoe het werkt. Ze zijn geen belastingadvies. Voor je eigen situatie kijk je bij de Belastingdienst of vraag je je accountant.",
  },
  reviewed: "2026-10-23",
  articles: {
    "hoeveel-belasting-apart-zetten-zzp": {
      slug: "hoeveel-belasting-apart-zetten-zzp",
      meta: {
        title: "Hoeveel belasting moet je apart zetten als zzp'er? (2026)",
        description:
          "Zet alle btw apart en reserveer voor inkomstenbelasting en Zvw op basis van je jaarwinst, niet met een vast percentage. Met rekenvoorbeeld voor 2026.",
      },
      h1: "Hoeveel belasting moet je apart zetten als zzp'er?",
      lead: "De vuistregel van 30% hoor je vaak. Soms zet je daarmee te veel apart, soms te weinig. Zo bereken je een bedrag dat bij jouw jaar past.",
      shortAnswer: `Zet de btw die je factureert volledig apart: die is niet van jou. Voor inkomstenbelasting en Zvw hangt het af van je winst over het hele jaar. Bij ${w(ladder[1].profitCents)} winst is dat gemiddeld zo'n ${p(ladder[1].averageRate)}, maar van elke extra euro gaat dan al ongeveer ${p(ladder[1].marginalRate)} naar de Belastingdienst.`,
      readMinutes: 6,
      sections: [
        {
          id: "btw",
          title: "Btw: zet alles apart",
          blocks: [
            {
              kind: "p",
              text: "De btw op je facturen int je voor de Belastingdienst. Je draagt hem af bij je btw-aangifte, meestal per kwartaal, na aftrek van de btw die je zelf op kosten hebt betaald. Behandel btw dus nooit als omzet.",
            },
            {
              kind: "calc",
              title: "Voorbeeld: één factuur van €2.500 (fictief)",
              rows: [
                { label: "Bedrag exclusief btw", value: e(story.invoice.exVatCents) },
                { label: "Btw 21%", value: e(story.invoice.vatCents), sign: "plus" },
                { label: "Je klant betaalt", value: e(story.invoice.inclCents), strong: true },
                { label: "Apart zetten voor btw", value: e(story.invoice.vatCents) },
              ],
            },
            {
              kind: "p",
              text: "Hoe btw werkt en wanneer je hem betaalt, lees je in [btw berekenen als zzp'er](/kennisbank/btw-berekenen-zzp). Gebruik je de [kleineondernemersregeling](/kennisbank/kor-regeling), dan reken je geen btw en is er ook niets apart te zetten.",
            },
          ],
        },
        {
          id: "ib-zvw",
          title: "Inkomstenbelasting en Zvw: het hangt af van je jaar",
          blocks: [
            {
              kind: "p",
              text: "Over je winst betaal je inkomstenbelasting en een inkomensafhankelijke bijdrage Zvw. Je betaalt ze over het hele jaar, niet per factuur. Daardoor kost dezelfde factuur in januari niet hetzelfde als in december, als je in de tussentijd meer bent gaan verdienen.",
            },
            {
              kind: "p",
              text: "Twee dingen maken het lastig om met één percentage te werken. Eerst gaan er aftrekposten af: de [zelfstandigenaftrek en de mkb-winstvrijstelling](/kennisbank/inkomstenbelasting-zzp). Daarna krijg je heffingskortingen, die bij een hoger inkomen weer kleiner worden. Bij een lage winst betaal je daardoor weinig, maar boven een bepaald punt gaat een groot deel van elke extra euro naar belasting.",
            },
            {
              kind: "table",
              caption: "Inkomstenbelasting en Zvw bij verschillende winsten in 2026, zonder ander inkomen, met zelfstandigenaftrek, zonder startersaftrek. Berekend met het rekenmodel van de Mizara-demo.",
              head: ["Winst over het jaar", "IB en Zvw samen", "Gemiddeld", "Van de volgende €1.000"],
              rows: ladder.map((row) => [w(row.profitCents), e(row.ibZvwCents), p(row.averageRate), p(row.marginalRate)]),
              numericCols: [0, 1, 2, 3],
            },
            {
              kind: "callout",
              tone: "note",
              title: "Gemiddeld en marginaal",
              text: "Het gemiddelde zegt hoeveel je over je hele winst betaalt. Het percentage in de laatste kolom zegt wat er gebeurt met de volgende factuur. Wie op het gemiddelde reserveert, komt aan het eind van een goed jaar vaak tekort.",
            },
          ],
        },
        {
          id: "voorbeeld",
          title: "Rekenvoorbeeld: wat zet Noor apart?",
          blocks: [
            {
              kind: "p",
              text: `Noor is de fictieve ontwerper uit onze [demo](/demo). Ze heeft halverwege oktober 2026 ${w(s.omzetCents)} omzet en ${w(s.kostenCents)} kosten geboekt. De btw over de eerste drie kwartalen heeft ze al aangegeven en betaald. Zo komt Mizara tot haar reservering:`,
            },
            {
              kind: "calc",
              title: "Reservering op 15 oktober 2026 (fictief)",
              rows: [
                { label: "Btw op facturen in Q4", value: e(s.outputBtwCents) },
                { label: "Btw op kosten in Q4", value: e(s.inputBtwCents), sign: "minus" },
                { label: "Btw te betalen dit kwartaal", value: e(s.btwPayableCents), strong: true },
                { label: "Inkomstenbelasting 2026 tot nu toe", value: e(s.ibCents) },
                { label: "Zvw-bijdrage 2026 tot nu toe", value: e(s.zvwCents), sign: "plus" },
                { label: "Marge van 2%", value: e(s.ibZvwBufferCents), sign: "plus" },
                { label: "IB en Zvw met marge", value: e(s.ibZvwBufferedCents), strong: true },
                { label: "Reserveren, naar boven afgerond", value: w(s.setAsideCents), strong: true },
              ],
              note: `De inkomstenbelasting is al verminderd met de algemene heffingskorting (${e(s.ahkCents)}) en de arbeidskorting (${e(s.arbeidskortingCents)}).`,
            },
          ],
        },
        {
          id: "aanpak",
          title: "Een aanpak die werkt",
          blocks: [
            {
              kind: "ol",
              items: [
                "**Open een aparte spaarrekening** voor belasting. Wat daar staat, is niet van jou.",
                "**Zet bij elke betaling meteen geld opzij**: alle btw, plus een deel voor inkomstenbelasting en Zvw.",
                "**Kijk elk kwartaal opnieuw**, rond je btw-aangifte. Gaat het beter dan verwacht, verhoog dan het deel voor inkomstenbelasting.",
                "**Pas je voorlopige aanslag aan** als je winst flink afwijkt van wat de Belastingdienst verwacht. Dat voorkomt een hoge naheffing.",
              ],
            },
            {
              kind: "p",
              text: "Mizara doet de eerste stappen voor je: na elke factuur en elke uitgave rekent het je reservering opnieuw uit. Hoe dat werkt, lees je bij het [belastingoverzicht](/functies/belastingoverzicht).",
            },
          ],
        },
        {
          id: "voorlopige-aanslag",
          title: "En de voorlopige aanslag?",
          blocks: [
            {
              kind: "p",
              text: "Veel zzp'ers krijgen een voorlopige aanslag: de Belastingdienst schat je inkomstenbelasting en Zvw vooraf en je betaalt die in maandelijkse termijnen. Wat je zo al betaalt, hoef je niet meer te reserveren. Klopt de schatting niet met je echte winst, dan wijzig je de voorlopige aanslag in Mijn Belastingdienst.",
            },
            {
              kind: "callout",
              tone: "warn",
              text: "Mizara houdt in de schatting op deze site geen rekening met een voorlopige aanslag, fiscaal partnerschap, box 2, verliesverrekening of teruggaven.",
            },
          ],
        },
      ],
      sources: [src.box1, src.zelfstandigenaftrek, src.mkb, src.zvw, src.voorlopig, src.kvk],
      related: [
        { href: "/kennisbank/inkomstenbelasting-zzp", label: "Inkomstenbelasting als zzp'er" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Btw berekenen als zzp'er" },
        { href: "/functies/belastingoverzicht", label: "Het belastingoverzicht in Mizara" },
      ],
    },
    "btw-berekenen-zzp": {
      slug: "btw-berekenen-zzp",
      meta: {
        title: "Btw berekenen als zzp'er: tarieven, aftrek en aangifte (2026)",
        description:
          "Zo bereken je btw als zzp'er: welk tarief, hoe je btw op kosten aftrekt, wanneer je aangifte doet en wat er op je factuur moet staan. Met voorbeelden.",
      },
      h1: "Btw berekenen als zzp'er",
      lead: "Btw is de belasting die je klant betaalt en jij doorgeeft. Als je weet welk tarief je rekent en welke btw je mag aftrekken, is de rest een kwestie van bijhouden.",
      shortAnswer:
        "Reken btw over je bedrag exclusief btw: meestal 21%, soms 9% of 0%. De btw die je zelf op zakelijke kosten betaalt, trek je af. Het verschil betaal je bij je btw-aangifte, meestal per kwartaal, uiterlijk de laatste dag van de maand na het kwartaal.",
      readMinutes: 5,
      sections: [
        {
          id: "tarieven",
          title: "Welk tarief reken je?",
          blocks: [
            {
              kind: "table",
              head: ["Tarief", "Wanneer", "Voorbeelden"],
              rows: [
                ["21%", "Het algemene tarief", "De meeste diensten: ontwerp, advies, software, bouw"],
                ["9%", "Het verlaagde tarief", "Voedingsmiddelen, boeken, kappers, fietsreparatie, personenvervoer"],
                ["0%", "Vooral bij zaken met het buitenland", "Levering van goederen buiten de EU"],
                ["Vrijgesteld", "Geen btw, ook geen aftrek", "Bijvoorbeeld bepaalde zorg en onderwijs"],
              ],
            },
            {
              kind: "p",
              text: "Twijfel je over je tarief, kijk dan in het overzicht van de Belastingdienst. Werk je voor klanten in het buitenland, dan gelden vaak andere regels, zoals btw verleggen.",
            },
          ],
        },
        {
          id: "berekenen",
          title: "Zo reken je het uit",
          blocks: [
            {
              kind: "calc",
              title: "Van exclusief naar inclusief",
              rows: [
                { label: "Bedrag exclusief btw", value: e(250_000) },
                { label: "× 21%", value: e(52_500), sign: "plus" },
                { label: "Bedrag inclusief btw", value: e(302_500), strong: true },
              ],
            },
            {
              kind: "calc",
              title: "Btw uit een bedrag inclusief btw halen",
              rows: [
                { label: "Bonnetje inclusief btw", value: e(story.expense.inclCents) },
                { label: "Gedeeld door 1,21", value: e(story.expense.exVatCents) },
                { label: "Btw op het bonnetje", value: e(story.expense.vatCents), strong: true },
              ],
              note: "Bij 9% deel je door 1,09.",
            },
          ],
        },
        {
          id: "aftrekken",
          title: "Btw op je kosten aftrekken",
          blocks: [
            {
              kind: "p",
              text: "Btw die je betaalt op zakelijke inkopen heet voorbelasting. Die trek je af van de btw die je hebt gerekend. Voorwaarde is een factuur of bonnetje op naam van je bedrijf dat aan de eisen voldoet. Voor sommige kosten, zoals privégebruik of eten en drinken, gelden beperkingen.",
            },
            {
              kind: "calc",
              title: "Btw van Noor in Q4 tot nu toe (fictief)",
              rows: [
                { label: "Btw op facturen", value: e(s.outputBtwCents) },
                { label: "Voorbelasting op kosten", value: e(s.inputBtwCents), sign: "minus" },
                { label: "Te betalen", value: e(s.btwPayableCents), strong: true },
              ],
            },
          ],
        },
        {
          id: "aangifte",
          title: "Wanneer doe je aangifte?",
          blocks: [
            {
              kind: "p",
              text: "De meeste zzp'ers doen per kwartaal btw-aangifte. Aangifte en betaling moeten binnen zijn op de laatste dag van de maand na het kwartaal. Ook als je niets hebt gefactureerd, doe je aangifte.",
            },
            {
              kind: "table",
              caption: "Uiterste datums voor aangifte en betaling bij kwartaalaangifte",
              head: ["Kwartaal", "Uiterlijk binnen"],
              rows: [
                ["1e kwartaal 2026", "30 april 2026"],
                ["2e kwartaal 2026", "31 juli 2026"],
                ["3e kwartaal 2026", "31 oktober 2026"],
                ["4e kwartaal 2026", "31 januari 2027"],
              ],
            },
            {
              kind: "p",
              text: "Mizara zet de bedragen per rubriek klaar. Je neemt ze over in Mijn Belastingdienst Zakelijk.",
            },
          ],
        },
        {
          id: "factuur",
          title: "Btw op je factuur",
          blocks: [
            {
              kind: "p",
              text: "Op je factuur staan het bedrag exclusief btw, het btw-tarief en het btw-bedrag per tarief, naast je btw-identificatienummer en de andere factuureisen. Lees meer bij [facturen maken in Mizara](/functies/facturen).",
            },
          ],
        },
      ],
      sources: [src.btwTarieven, src.btwDatums, src.btwAangifte, src.factuureisen],
      related: [
        { href: "/kennisbank/kor-regeling", label: "De kleineondernemersregeling (KOR)" },
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "Hoeveel belasting apart zetten?" },
        { href: "/functies/kosten", label: "Kosten en voorbelasting in Mizara" },
      ],
    },
    "inkomstenbelasting-zzp": {
      slug: "inkomstenbelasting-zzp",
      meta: {
        title: "Inkomstenbelasting als zzp'er: zo wordt het berekend (2026)",
        description:
          "Van winst naar inkomstenbelasting: zelfstandigenaftrek, startersaftrek, mkb-winstvrijstelling, tarieven, heffingskortingen en Zvw in 2026. Met rekenvoorbeeld.",
      },
      h1: "Inkomstenbelasting als zzp'er: van winst naar aanslag",
      lead: "Als zzp'er betaal je inkomstenbelasting over je winst, na een paar aftrekposten. Daarbovenop komt de Zvw-bijdrage. Stap voor stap ziet dat er zo uit.",
      shortAnswer:
        "Je winst gaat omlaag met de zelfstandigenaftrek (€1.200 in 2026, als je aan het urencriterium voldoet), eventueel de startersaftrek (€2.123) en de mkb-winstvrijstelling (12,7%). Over wat overblijft betaal je 35,75% tot €38.883 en 37,56% daarboven, min heffingskortingen. Daarnaast betaal je 4,85% Zvw.",
      readMinutes: 7,
      sections: [
        {
          id: "stappen",
          title: "De stappen",
          blocks: [
            {
              kind: "ol",
              items: [
                "**Winst**: omzet min zakelijke kosten en afschrijvingen.",
                "**Ondernemersaftrek**: de zelfstandigenaftrek en, als je starter bent, de startersaftrek.",
                "**Mkb-winstvrijstelling**: 12,7% van de winst na ondernemersaftrek.",
                "**Belastbare winst**: wat overblijft. Dit valt in box 1, samen met eventueel ander inkomen.",
                "**Tarief**: 35,75% tot €38.883, 37,56% tot €78.426 en 49,50% daarboven.",
                "**Heffingskortingen**: de algemene heffingskorting en de arbeidskorting gaan van de belasting af. Ze worden kleiner naarmate je meer verdient.",
                "**Zvw-bijdrage**: 4,85% over je belastbare winst, tot een maximum van €79.409.",
              ],
            },
          ],
        },
        {
          id: "aftrek",
          title: "Zelfstandigenaftrek, startersaftrek en het urencriterium",
          blocks: [
            {
              kind: "p",
              text: "De zelfstandigenaftrek is in 2026 €1.200. Je krijgt hem als je ondernemer bent voor de inkomstenbelasting en aan het urencriterium voldoet: minstens 1.225 uur per jaar aan je onderneming, en meestal meer tijd aan je onderneming dan aan ander werk. Ook tijd voor offertes, administratie en acquisitie telt mee.",
            },
            {
              kind: "p",
              text: "Was je in een of meer van de vijf jaar ervoor geen ondernemer en had je in die periode hooguit twee keer zelfstandigenaftrek, dan krijg je er €2.123 startersaftrek bij.",
            },
            {
              kind: "callout",
              tone: "note",
              title: "Volgend jaar",
              text: "De zelfstandigenaftrek daalt in 2027 naar €900. Het kabinet heeft voorgesteld de startersaftrek vanaf 2027 sterk te verlagen; dat voorstel moet nog door de Tweede en Eerste Kamer.",
            },
          ],
        },
        {
          id: "voorbeeld",
          title: `Rekenvoorbeeld: ${w(WORKED_PROFIT_CENTS)} winst`,
          blocks: [
            {
              kind: "calc",
              title: "Inkomstenbelasting en Zvw over 2026 (fictief)",
              rows: [
                { label: "Winst", value: e(worked.winstCents) },
                { label: "Zelfstandigenaftrek", value: e(worked.zelfstandigenaftrekCents), sign: "minus" },
                { label: "Mkb-winstvrijstelling (12,7%)", value: e(worked.mkbVrijstellingCents), sign: "minus" },
                { label: "Belastbare winst", value: e(worked.belastbareWinstCents), strong: true },
                { label: "Belasting box 1", value: e(worked.box1Cents) },
                { label: "Algemene heffingskorting", value: e(worked.ahkCents), sign: "minus" },
                { label: "Arbeidskorting", value: e(worked.arbeidskortingCents), sign: "minus" },
                { label: "Inkomstenbelasting", value: e(worked.ibCents), strong: true },
                { label: "Zvw-bijdrage (4,85%)", value: e(worked.zvwCents), sign: "plus" },
                { label: "Samen", value: e(worked.ibZvwCents), strong: true },
              ],
              note: `Met startersaftrek zou het samen ${e(workedStarter.ibZvwCents)} zijn. Uitgangspunten: geen ander inkomen, geen fiscale partner, geen aftrekposten buiten de onderneming. Berekend met het rekenmodel van de Mizara-demo.`,
            },
          ],
        },
        {
          id: "beperking",
          title: "Aftrek tegen maximaal 37,56%",
          blocks: [
            {
              kind: "p",
              text: "Valt een deel van je inkomen in de hoogste schijf, dan levert een aftrekpost je niet 49,50% op maar maximaal 37,56%. Dat geldt onder meer voor de ondernemersaftrek en de mkb-winstvrijstelling. De Belastingdienst rekent dit automatisch mee in je aangifte.",
            },
          ],
        },
        {
          id: "betalen",
          title: "Hoe en wanneer je betaalt",
          blocks: [
            {
              kind: "p",
              text: "Je doet elk jaar aangifte over het jaar ervoor, meestal voor 1 mei. Met een voorlopige aanslag betaal je al in de loop van het jaar. Zonder voorlopige aanslag komt het hele bedrag in één keer na je aangifte. Daarom is het slim om [elke maand geld apart te zetten](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
      ],
      sources: [src.box1, src.zelfstandigenaftrek, src.uren, src.mkb, src.zvw, src.kvk],
      related: [
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "Hoeveel belasting apart zetten?" },
        { href: "/functies/belastingoverzicht", label: "Het belastingoverzicht in Mizara" },
        { href: "/demo", label: "Reken het na in de demo" },
      ],
    },
    "kor-regeling": {
      slug: "kor-regeling",
      meta: {
        title: "De kleineondernemersregeling (KOR) uitgelegd (2026)",
        description:
          "Wat is de KOR, wanneer mag je meedoen, wat zijn de voor- en nadelen en wat gebeurt er als je boven €20.000 omzet komt? Uitleg voor zzp'ers.",
      },
      h1: "De kleineondernemersregeling (KOR): wanneer is het slim?",
      lead: "Met de KOR reken je geen btw en doe je geen btw-aangifte. Dat scheelt werk en kan je prijzen voor particulieren verlagen. Maar je mag dan ook geen btw terugvragen.",
      shortAnswer:
        "De KOR is een btw-vrijstelling voor ondernemers met maximaal €20.000 omzet per jaar, in het jaar zelf en het jaar ervoor. Je rekent geen btw en vraagt geen btw terug. Kom je in de loop van het jaar boven €20.000, dan meld je je direct af en reken je weer btw.",
      readMinutes: 5,
      sections: [
        {
          id: "voorwaarden",
          title: "Wie mag meedoen?",
          blocks: [
            {
              kind: "ul",
              items: [
                "Je onderneming is in Nederland gevestigd.",
                "Je omzet is maximaal €20.000 in het jaar waarin je je aanmeldt én in het jaar daarvoor.",
                "Wat je levert, is normaal belast met btw.",
              ],
            },
            {
              kind: "p",
              text: "Je omzet voor de KOR is wat je klanten betalen, zonder btw. Je meldt je aan in Mijn Belastingdienst Zakelijk, minstens vier weken voor je wilt beginnen.",
            },
          ],
        },
        {
          id: "afwegen",
          title: "Voor- en nadelen",
          blocks: [
            {
              kind: "table",
              head: ["", "Met KOR", "Zonder KOR"],
              rows: [
                ["Btw op je facturen", "Nee", "Ja"],
                ["Btw-aangifte", "Nee", "Meestal per kwartaal"],
                ["Btw op kosten terugvragen", "Nee", "Ja"],
                ["Interessant als je klanten", "Particulieren zijn", "Ondernemers zijn"],
              ],
            },
            {
              kind: "p",
              text: "Werk je vooral voor bedrijven, dan levert de KOR weinig op: zij trekken de btw op jouw factuur toch af. Doe je grote investeringen, zoals een nieuwe laptop of camera, dan mis je met de KOR de btw-teruggave.",
            },
          ],
        },
        {
          id: "grens",
          title: "Over de €20.000 heen",
          blocks: [
            {
              kind: "p",
              text: "Zodra je omzet in een jaar boven €20.000 komt, mag je de KOR niet meer gebruiken. Je meldt je direct af. Over de factuur waarmee je de grens passeert, reken je al btw over het volledige bedrag.",
            },
            {
              kind: "calc",
              title: "Voorbeeld",
              rows: [
                { label: "Omzet tot en met 15 september", value: "€ 19.750" },
                { label: "Nieuwe opdracht op 16 september", value: "€ 500" },
                { label: "Omzet daarna", value: "€ 20.250", strong: true },
              ],
              note: "Vanaf 16 september gelden de gewone btw-regels. Over de €500 reken je dus 21% btw.",
            },
            {
              kind: "p",
              text: "Na het afmelden kun je de rest van dat jaar en het hele jaar erna niet opnieuw meedoen. Vrijwillig stoppen kan ook, met ingang van een nieuw aangiftetijdvak en minstens vier weken van tevoren aangemeld.",
            },
          ],
        },
        {
          id: "mizara",
          title: "De KOR in Mizara",
          blocks: [
            {
              kind: "p",
              text: "In Mizara geef je aan of je de KOR gebruikt. Dan zie je hoe dicht je bij de grens van €20.000 zit. Zonder KOR reken je de btw per factuur en zie je wat je per kwartaal afdraagt.",
            },
          ],
        },
      ],
      sources: [src.korVoorwaarden, src.korAf, src.korAan],
      related: [
        { href: "/kennisbank/btw-berekenen-zzp", label: "Btw berekenen als zzp'er" },
        { href: "/voor-zzpers", label: "Voor wie Mizara is" },
        { href: "/functies/facturen", label: "Facturen in Mizara" },
      ],
    },
  },
};

import type { Dict } from "../types";

export const features: Dict["features"] = {
  hub: {
    meta: {
      title: "Functies: facturen, kosten, bankimport en belastingoverzicht",
      description:
        "Alles wat Mizara doet voor je administratie: facturen en offertes, bonnetjes uitlezen, bankafschriften importeren en een schatting van je btw, inkomstenbelasting en Zvw.",
    },
    h1: "Wat Mizara voor je administratie doet",
    lead: "Vier onderdelen die op elkaar aansluiten. Een factuur telt mee in je omzet, een betaling op je afschrift koppelt aan die factuur, en je belastingoverzicht rekent met allebei.",
    extrasTitle: "En verder",
    extras: [
      { title: "Klanten en producten", text: "Bewaar klantgegevens en vaste diensten of producten, zodat een factuur in een paar klikken klaar is." },
      { title: "Urenregistratie", text: "Houd je uren bij, ook met het oog op het urencriterium van 1.225 uur per jaar." },
      { title: "Grootboek", text: "Elke boeking komt in een dubbel boekhoudkundig grootboek terecht, met proef- en saldibalans." },
      { title: "Accountant erbij", text: "Geef je accountant toegang tot je administratie, zodat jullie naar dezelfde cijfers kijken." },
      { title: "Aangiftes voorbereid", text: "Cijfers voor je btw-aangifte, ICP-opgave en inkomstenbelasting staan klaar. Indienen doe je zelf." },
      { title: "Importeren", text: "Neem je administratie mee uit Moneybird, e-Boekhouden, Exact of een CSV- of XAF-bestand." },
    ],
  },
  pages: {
    facturen: {
      slug: "facturen",
      nav: "Facturen",
      summary: "Facturen en offertes die voldoen aan de factuureisen, met btw per regel en herinneringen als er niet betaald wordt.",
      meta: {
        title: "Facturen maken",
        description:
          "Maak facturen met doorlopende nummers en de juiste btw. Offertes met digitale handtekening, terugkerende facturen, betaalherinneringen en betalen via iDEAL.",
      },
      h1: "Facturen maken die kloppen, en zien wat je eraan overhoudt",
      lead: "Een factuur in Mizara is meer dan een pdf. Hij telt meteen mee in je omzet, je btw en je reservering voor de Belastingdienst.",
      highlights: [
        { title: "Doorlopend genummerd", text: "Mizara houdt de nummering bij, zodat er geen gaten of dubbele nummers ontstaan." },
        { title: "Btw per regel", text: "Kies per regel 21%, 9% of 0%. De btw wordt per tarief opgeteld." },
        { title: "Wat blijft er over", text: "Bij elke factuur zie je ongeveer wat er na kosten en belasting van die klus overblijft." },
      ],
      sections: [
        {
          id: "factuureisen",
          title: "Wat er op een factuur moet staan",
          blocks: [
            {
              kind: "p",
              text: "De Belastingdienst stelt eisen aan een factuur. Mizara vult de vaste gegevens voor je in en laat je per factuur aanvullen wat verschilt. Op een volledige factuur staan onder meer:",
            },
            {
              kind: "ul",
              items: [
                "je naam, adres, KvK-nummer en btw-identificatienummer",
                "de naam en het adres van je klant",
                "een uniek, doorlopend factuurnummer en de factuurdatum",
                "een omschrijving van wat je hebt geleverd en wanneer",
                "het bedrag exclusief btw, het btw-tarief en het btw-bedrag per tarief",
              ],
            },
            {
              kind: "p",
              text: "De volledige lijst staat bij de [factuureisen van de Belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/facturen_maken/factuureisen/). Werk je met verlegde btw of lever je aan het buitenland, dan gelden er extra vermeldingen.",
            },
          ],
        },
        {
          id: "offertes",
          title: "Van offerte naar factuur",
          blocks: [
            {
              kind: "p",
              text: "Stuur eerst een offerte. Je klant kan die online bekijken en ondertekenen. Is hij akkoord, dan maak je er een factuur van zonder alles opnieuw in te typen.",
            },
            {
              kind: "p",
              text: "Werk je met vaste maandbedragen, zoals een retainer of onderhoud, gebruik dan een terugkerende factuur. Mizara maakt hem op het ingestelde moment opnieuw aan.",
            },
          ],
        },
        {
          id: "betaald-worden",
          title: "Betaald worden",
          blocks: [
            {
              kind: "p",
              text: "Wil je dat klanten direct kunnen betalen, koppel dan je eigen Mollie-account. Je klant krijgt dan een betaallink voor iDEAL. Dat is optioneel; een gewone overboeking werkt ook.",
            },
            {
              kind: "p",
              text: "Blijft een betaling uit, stuur dan vanuit de factuur een herinnering en later een aanmaning. Komt de betaling binnen op je bankafschrift, dan koppel je hem aan de factuur bij het [importeren van je bankafschrift](/functies/bank).",
            },
          ],
        },
        {
          id: "overhouden",
          title: "Wat houd je over aan een factuur?",
          blocks: [
            {
              kind: "p",
              text: "Bij een factuur zie je wat de klant betaalt, welke kosten je aan die klus hebt gekoppeld en hoeveel inkomstenbelasting en Zvw de factuur ongeveer toevoegt aan je jaar. Wat overblijft is een schatting van wat je echt verdient.",
            },
            {
              kind: "p",
              text: "Mizara rekent die belasting niet met een vast percentage, maar over je hele jaar. Waarom dat uitmaakt, lees je in [hoeveel belasting je apart zet](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Kan ik een factuur als pdf downloaden?",
          a: "Ja. Elke factuur kun je als pdf downloaden of per e-mail naar je klant sturen.",
        },
        {
          q: "Moet ik iDEAL gebruiken?",
          a: "Nee. Betalen via iDEAL werkt via je eigen Mollie-account en is optioneel. Zonder Mollie staat je rekeningnummer op de factuur en betaalt je klant met een overboeking.",
        },
        {
          q: "Welk btw-tarief moet ik rekenen?",
          a: "Dat hangt af van wat je levert. Voor de meeste diensten is het 21%. Lees meer in [btw berekenen](/kennisbank/btw-berekenen-zzp).",
        },
      ],
      related: [
        { href: "/functies/kosten", label: "Kosten en bonnetjes" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Btw berekenen" },
        { href: "/demo", label: "Maak een factuur in de demo" },
      ],
    },
    kosten: {
      slug: "kosten",
      nav: "Kosten",
      summary: "Bonnetjes uploaden, laten uitlezen en zelf bevestigen. Met categorie, btw en het bonnetje bij de boeking.",
      meta: {
        title: "Kosten en bonnetjes boeken",
        description:
          "Upload een bonnetje en laat bedrag, datum en btw uitlezen. Jij controleert en bevestigt. Elke uitgave telt mee in je btw en je winst.",
      },
      h1: "Bonnetjes erin, kosten eruit. Jij houdt de controle.",
      lead: "Kosten verlagen je winst en de btw die je betaalt. Dan moet je ze wel boeken, met het bonnetje erbij. Mizara maakt dat zo kort mogelijk.",
      highlights: [
        { title: "Uitlezen", text: "Mizara leest leverancier, datum, bedrag en btw van een foto of pdf." },
        { title: "Jij bevestigt", text: "Uitgelezen waarden zijn een voorstel. Pas als jij akkoord geeft, wordt er geboekt." },
        { title: "Bonnetje bewaard", text: "Het bonnetje blijft bij de boeking, voor als de Belastingdienst ernaar vraagt." },
      ],
      sections: [
        {
          id: "uitlezen",
          title: "Hoe uitlezen werkt",
          blocks: [
            {
              kind: "p",
              text: "Upload een foto of pdf van een bonnetje of inkoopfactuur. Mizara herkent de gegevens die erop staan en vult het formulier voor je in: leverancier, datum, totaalbedrag, btw-tarief en een voorstel voor de categorie.",
            },
            {
              kind: "callout",
              tone: "note",
              title: "Uitlezen is niet foutloos",
              text: "Een kreukelig bonnetje, een vage foto of een ongebruikelijke opmaak kan tot verkeerde waarden leiden. Daarom boekt Mizara niets automatisch. Je ziet het bonnetje naast de uitgelezen waarden en bevestigt zelf.",
            },
            {
              kind: "p",
              text: "Liever alles zelf invullen? Dat kan ook. Uitlezen is een hulpmiddel, geen verplichting.",
            },
          ],
        },
        {
          id: "btw-terug",
          title: "Btw op je kosten",
          blocks: [
            {
              kind: "p",
              text: "Rekent een leverancier btw, dan mag je die meestal aftrekken als voorbelasting. Mizara houdt die btw per kwartaal bij en verrekent hem met de btw op je facturen. Zo zie je wat je per saldo betaalt.",
            },
            {
              kind: "calc",
              title: "Voorbeeld: flexplek in oktober (fictief)",
              rows: [
                { label: "Totaal op het bonnetje", value: "€ 223,85" },
                { label: "Waarvan btw (21%)", value: "€ 38,85", sign: "minus" },
                { label: "Kosten voor je winst", value: "€ 185,00", strong: true },
              ],
              note: "De €38,85 btw verrekent Mizara in je btw-aangifte over het vierde kwartaal.",
            },
            {
              kind: "p",
              text: "Sommige kosten zijn maar deels aftrekbaar, zoals eten en drinken of privégebruik. Twijfel je, kijk dan bij de Belastingdienst of vraag je accountant.",
            },
          ],
        },
        {
          id: "aan-klus",
          title: "Kosten aan een klus koppelen",
          blocks: [
            {
              kind: "p",
              text: "Hoort een uitgave bij een bepaalde opdracht, koppel hem dan aan de factuur. Bij die factuur zie je daarna wat de klus je echt oplevert, na kosten en belasting.",
            },
          ],
        },
        {
          id: "bewaren",
          title: "Hoe lang je bonnetjes bewaart",
          blocks: [
            {
              kind: "p",
              text: "Als ondernemer bewaar je je administratie in principe 7 jaar. Voor gegevens over onroerende zaken is dat 10 jaar. Mizara bewaart het bonnetje bij de boeking, zodat je het later terugvindt.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Welke bestanden kan ik uploaden?",
          a: "Foto's en pdf's van bonnetjes en inkoopfacturen.",
        },
        {
          q: "Wat als het uitlezen niet klopt?",
          a: "Je past de waarde aan voordat je bevestigt. Er wordt niets geboekt zonder jouw akkoord.",
        },
        {
          q: "Kan ik kosten ook vanaf mijn bankafschrift boeken?",
          a: "Ja. Na het [importeren van je afschrift](/functies/bank) kun je een betaling direct als uitgave boeken of koppelen aan een bonnetje dat je al hebt geüpload.",
        },
      ],
      related: [
        { href: "/functies/bank", label: "Bankafschriften importeren" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Btw berekenen en voorbelasting" },
        { href: "/demo", label: "Boek een bonnetje in de demo" },
      ],
    },
    bank: {
      slug: "bank",
      nav: "Bank",
      summary: "Importeer CAMT.053- of MT940-bestanden en koppel betalingen aan facturen en kosten. Geen directe bankkoppeling.",
      meta: {
        title: "Bankafschriften importeren en betalingen koppelen",
        description:
          "Importeer je bankafschrift als CAMT.053- of MT940-bestand. Mizara stelt koppelingen voor met facturen en kosten. Geen directe bankkoppeling, jij houdt de regie.",
      },
      h1: "Je bankafschrift erbij, zonder je bank te koppelen",
      lead: "Download een afschrift in je bankomgeving, importeer het in Mizara en koppel elke betaling aan een factuur of uitgave. Zo sluit je administratie aan op wat er echt op je rekening gebeurde.",
      highlights: [
        { title: "Bestanden, geen koppeling", text: "CAMT.053 (.xml) en MT940 (.mt940, .sta, .txt) voor eurorekeningen." },
        { title: "Voorstellen", text: "Mizara herkent betalingen die bij een openstaande factuur of een bonnetje lijken te horen." },
        { title: "Boekregels", text: "Komt dezelfde betaling steeds terug, leg dan vast hoe die geboekt wordt: als voorstel of automatisch." },
      ],
      sections: [
        {
          id: "hoe",
          title: "Zo importeer je een afschrift",
          blocks: [
            {
              kind: "ol",
              items: [
                "Log in bij je bank en exporteer je transacties als CAMT.053 of MT940. De meeste Nederlandse banken bieden een van beide aan.",
                "Upload het bestand in Mizara onder Bank.",
                "Loop de nieuwe betalingen langs. Bij elke betaling zie je een voorstel, of de vraag waar hij bij hoort.",
              ],
            },
            {
              kind: "callout",
              tone: "note",
              title: "Waarom geen directe koppeling?",
              text: "Mizara leest alleen de bestanden die jij uploadt. Er is geen verbinding met je bank, dus Mizara kan niets op je rekening zien of doen. Het nadeel: je importeert zelf, bijvoorbeeld eens per maand of voor je btw-aangifte.",
            },
          ],
        },
        {
          id: "koppelen",
          title: "Wat er met je betalingen gebeurt",
          blocks: [
            {
              kind: "p",
              text: "Voor elke betaling zoekt Mizara naar iets dat erbij past: een openstaande factuur met hetzelfde bedrag, een uitgave die je al hebt geboekt of een bekende tegenpartij. Het herkent ook betalingen die geen omzet of kosten zijn:",
            },
            {
              kind: "ul",
              items: [
                "overboekingen van en naar je eigen rekeningen",
                "uitbetalingen van Mollie",
                "betalingen aan de Belastingdienst",
              ],
            },
            {
              kind: "p",
              text: "Je bevestigt een voorstel met één tik en maakt het ongedaan als het toch niet klopte. Een betaling zonder bonnetje kun je direct als uitgave boeken.",
            },
          ],
        },
        {
          id: "waarom",
          title: "Waarom je bank erbij hoort",
          blocks: [
            {
              kind: "p",
              text: "Zonder bankafschrift weet je niet welke facturen echt betaald zijn en welke kosten je bent vergeten te boeken. Met het afschrift erbij zie je het verschil tussen wat je hebt geboekt en wat er op je rekening staat.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Werkt dit met mijn bank?",
          a: "Als je bank je transacties kan exporteren als CAMT.053 (.xml) of MT940 (.mt940, .sta, .txt), dan werkt het. Alleen rekeningen in euro worden ondersteund.",
        },
        {
          q: "Komt er een automatische bankkoppeling?",
          a: "Op dit moment niet. Mizara werkt met bestanden die je zelf importeert.",
        },
        {
          q: "Wat doe ik met een betaling die nergens bij hoort?",
          a: "Je kunt een regel bewust niet boeken, met een reden erbij. Zo blijft zichtbaar waarom je saldo en je administratie op dat punt verschillen.",
        },
      ],
      related: [
        { href: "/functies/facturen", label: "Facturen en betalingen" },
        { href: "/functies/kosten", label: "Kosten en bonnetjes" },
        { href: "/faq", label: "Alle vragen" },
      ],
    },
    belastingoverzicht: {
      slug: "belastingoverzicht",
      nav: "Belastingoverzicht",
      summary: "Wat je reserveert voor btw, inkomstenbelasting en Zvw, met uitleg hoe het bedrag tot stand komt.",
      meta: {
        title: "Belastingoverzicht: hoeveel reserveer je voor de Belastingdienst?",
        description:
          "Mizara schat op basis van je boekingen wat je opzij zet voor btw, inkomstenbelasting en Zvw, met 2% marge. Met uitleg, zonder te doen alsof het advies is.",
      },
      h1: "Hoeveel je opzij zet voor de Belastingdienst, op elk moment",
      lead: "Na elke factuur en elke uitgave zie je wat je reserveert voor btw, inkomstenbelasting en Zvw. Dat is een schatting, en Mizara laat zien hoe die tot stand komt.",
      highlights: [
        { title: "Btw per kwartaal", text: "Btw op je facturen min btw op je kosten, voor het lopende kwartaal." },
        { title: "IB en Zvw over het jaar", text: "Over je winst tot nu toe, met aftrekposten en heffingskortingen." },
        { title: "2% marge", text: "Een kleine buffer bovenop de inkomstenbelasting en Zvw." },
      ],
      sections: [
        {
          id: "bedrag",
          title: "Hoe de reservering wordt berekend",
          blocks: [
            {
              kind: "p",
              text: "Het bedrag bovenaan je overzicht bestaat uit twee delen. Mizara telt ze op en rondt af naar boven, op hele euro's.",
            },
            {
              kind: "ol",
              items: [
                "**Btw van het lopende kwartaal.** De btw op je facturen min de btw op je kosten. Krijg je per saldo geld terug, dan telt dat niet mee als reservering.",
                "**Inkomstenbelasting en Zvw over dit jaar.** Mizara berekent je winst tot nu toe, trekt zelfstandigenaftrek, startersaftrek en mkb-winstvrijstelling af als je daar recht op hebt, past de tarieven en heffingskortingen toe en telt de Zvw-bijdrage erbij. Daarbovenop komt 2% marge.",
              ],
            },
            {
              kind: "p",
              text: "Een stap voor stap uitgewerkt voorbeeld staat in [hoeveel belasting je apart zet](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
        {
          id: "profiel",
          title: "Je fiscale profiel",
          blocks: [
            {
              kind: "p",
              text: "Hoe nauwkeuriger je profiel, hoe beter de schatting. In Mizara geef je onder meer aan of je aan het urencriterium voldoet, of je startersaftrek hebt en of je de kleineondernemersregeling gebruikt.",
            },
          ],
        },
        {
          id: "grenzen",
          title: "Wat er niet in zit",
          blocks: [
            {
              kind: "callout",
              tone: "warn",
              title: "Een schatting, geen aanslag",
              text: "Meegenomen: winst uit onderneming. Niet meegenomen: fiscaal partnerschap en verdeling, box 2, verliesverrekening en teruggaven. Heb je loon uit een baan, een eigen woning of vermogen in box 3, dan kan je werkelijke belasting afwijken.",
            },
            {
              kind: "p",
              text: "Je definitieve inkomstenbelasting hoor je pas na je aangifte. Heb je een voorlopige aanslag, dan betaal je daar al een deel van. Klopt die niet met wat je verwacht, dan kun je hem laten aanpassen via Mijn Belastingdienst.",
            },
          ],
        },
        {
          id: "aangifte",
          title: "Van overzicht naar aangifte",
          blocks: [
            {
              kind: "p",
              text: "Voor je btw-aangifte zet Mizara de bedragen per rubriek klaar. Ook voor de ICP-opgave en je inkomstenbelasting staan de cijfers klaar. Indienen doe je zelf, bij de Belastingdienst.",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Hoe nauwkeurig is de schatting?",
          a: "Zo nauwkeurig als je boekingen en je profiel. Mizara gebruikt de tarieven van het belastingjaar, maar kent niet je hele situatie. Gebruik het als richtlijn en controleer je aangifte zelf of met je accountant.",
        },
        {
          q: "Rekent Mizara met wat ik de rest van het jaar nog verdien?",
          a: "Nee. De reservering gaat over je boekingen tot nu toe. Zo zet je opzij voor wat je al verdiend hebt, niet voor een verwachting.",
        },
        {
          q: "Waarom 2% marge?",
          a: "Kleine verschillen in afronding, tarieven of een vergeten post zijn zo opgevangen. Het gaat om een kleine buffer, niet om een veilige bovengrens.",
        },
      ],
      related: [
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "Hoeveel belasting apart zetten?" },
        { href: "/kennisbank/inkomstenbelasting-zzp", label: "Inkomstenbelasting" },
        { href: "/demo", label: "Zie de reservering in de demo" },
      ],
    },
  },
};

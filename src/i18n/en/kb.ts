import type { Dict } from "../types";
import { homeStory } from "@/lib/demo-tax/story";
import { LADDER_PROFITS, WORKED_PROFIT_CENTS, profitLadder, yearWithProfit } from "@/lib/demo-tax/examples";
import { formatEuro, formatEuroWhole, formatPercent } from "@/lib/money";

const e = (cents: number) => formatEuro(cents, "en");
const w = (cents: number) => formatEuroWhole(cents, "en");
const p = (rate: number) => formatPercent(Math.round(rate * 1000) / 1000, "en");

const story = homeStory();
const s = story.after;
const ladder = profitLadder(LADDER_PROFITS);
const worked = yearWithProfit(WORKED_PROFIT_CENTS);
const workedStarter = yearWithProfit(WORKED_PROFIT_CENTS, { starter: true, urencriterium: true });

const BD = "https://www.belastingdienst.nl/wps/wcm/connect";
const src = {
  box1: { label: "Belastingdienst: Box 1 rates (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1` },
  zelfstandigenaftrek: { label: "Belastingdienst: Self-employed deduction 2026 (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026` },
  uren: { label: "Belastingdienst: Hours criterion (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/voorwaarden_urencriterium` },
  mkb: { label: "Belastingdienst: SME profit exemption 2026 (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/mkb-winstvrijstelling-2026` },
  zvw: { label: "Belastingdienst: Zvw contribution rates (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/veranderingen-bijdrage-zvw/percentages-zvw` },
  voorlopig: { label: "Belastingdienst: Checking and changing a provisional assessment (Dutch)", href: `${BD}/nl/voorlopige-aanslag/content/in-welke-situaties-moet-ik-mijn-voorlopige-aanslag-wijzigen` },
  btwTarieven: { label: "Belastingdienst: VAT rates (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief` },
  btwDatums: { label: "Belastingdienst: VAT return and payment deadlines (Dutch)", href: `${BD}/nl/btw/content/uiterste-aangifte-en-betaaldatums` },
  btwAangifte: { label: "Belastingdienst: Filing a VAT return (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/btw_aangifte_doen_en_betalen/btw-aangifte-waar-moet-u-aan-denken/btw-aangifte-waar-moet-u-aan-denken` },
  factuureisen: { label: "Belastingdienst: Invoice requirements (Dutch)", href: `${BD}/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/facturen_maken/factuureisen/` },
  korVoorwaarden: { label: "Belastingdienst: KOR conditions (Dutch)", href: `${BD}/nl/btw/content/kor-voorwaarden` },
  korAf: { label: "Belastingdienst: Leaving the KOR (Dutch)", href: `${BD}/nl/btw/content/afmelden-kor` },
  korAan: { label: "Belastingdienst: Joining the KOR (Dutch)", href: `${BD}/nl/btw/content/aanmelden-kor` },
  kvk: { label: "KVK: Tax rates 2026 for business owners (Dutch)", href: "https://www.kvk.nl/geldzaken/belastingtarieven-2026/" },
};

export const kb: Dict["kb"] = {
  hub: {
    meta: {
      title: "Knowledge base: tax and bookkeeping for Dutch freelancers",
      description:
        "Clear explanations of VAT, income tax, the KOR and how much to set aside as a freelancer in the Netherlands. With 2026 examples and links to the Belastingdienst.",
    },
    h1: "Knowledge base for freelancers",
    lead: "Answers to the questions every freelancer in the Netherlands asks at some point, with worked examples for tax year 2026 and links to the source.",
    note: "These articles explain how things work. They are not tax advice. For your own situation, check the Belastingdienst or ask your accountant.",
  },
  reviewed: "2026-10-23",
  articles: {
    "hoeveel-belasting-apart-zetten-zzp": {
      slug: "hoeveel-belasting-apart-zetten-zzp",
      meta: {
        title: "How much tax should a Dutch freelancer set aside? (2026)",
        description:
          "Set aside all VAT, and reserve for income tax and Zvw based on your annual profit rather than a fixed percentage. With a worked example for 2026.",
      },
      h1: "How much tax should you set aside as a freelancer?",
      lead: "You'll often hear the 30% rule of thumb. Sometimes that's too much, sometimes too little. Here's how to work out an amount that fits your year.",
      shortAnswer: `Set aside all the VAT you invoice: it isn't yours. For income tax and Zvw, it depends on your profit over the whole year. At ${w(ladder[1].profitCents)} profit, that averages around ${p(ladder[1].averageRate)}, but about ${p(ladder[1].marginalRate)} of each extra euro already goes to the Belastingdienst.`,
      readMinutes: 6,
      sections: [
        {
          id: "btw",
          title: "VAT: set all of it aside",
          blocks: [
            {
              kind: "p",
              text: "The VAT on your invoices is collected for the Belastingdienst. You pay it with your VAT return, usually quarterly, after deducting the VAT you paid on costs. Never treat VAT as revenue.",
            },
            {
              kind: "calc",
              title: "Example: one €2,500 invoice (fictional)",
              rows: [
                { label: "Amount excluding VAT", value: e(story.invoice.exVatCents) },
                { label: "VAT 21%", value: e(story.invoice.vatCents), sign: "plus" },
                { label: "Your client pays", value: e(story.invoice.inclCents), strong: true },
                { label: "Set aside for VAT", value: e(story.invoice.vatCents) },
              ],
            },
            {
              kind: "p",
              text: "How VAT works and when you pay it is covered in [calculating VAT as a freelancer](/kennisbank/btw-berekenen-zzp). If you use the [small business scheme (KOR)](/kennisbank/kor-regeling), you don't charge VAT, so there's nothing to set aside for it.",
            },
          ],
        },
        {
          id: "ib-zvw",
          title: "Income tax and Zvw: it depends on your year",
          blocks: [
            {
              kind: "p",
              text: "On your profit you pay income tax and an income-related Zvw (health insurance) contribution. You pay them over the whole year, not per invoice. So the same invoice doesn't cost the same in January as in December if you've earned more in between.",
            },
            {
              kind: "p",
              text: "Two things make a single percentage unreliable. First, deductions come off: the [self-employed deduction and the SME profit exemption](/kennisbank/inkomstenbelasting-zzp). Then you get tax credits, which shrink as your income rises. So at low profit you pay little, but beyond a certain point a large share of each extra euro goes to tax.",
            },
            {
              kind: "table",
              caption: "Income tax and Zvw at different profits in 2026, with no other income, with the self-employed deduction and without the starter deduction. Calculated with the Mizara demo model.",
              head: ["Profit for the year", "Income tax and Zvw", "Average", "Of the next €1,000"],
              rows: ladder.map((row) => [w(row.profitCents), e(row.ibZvwCents), p(row.averageRate), p(row.marginalRate)]),
              numericCols: [0, 1, 2, 3],
            },
            {
              kind: "callout",
              tone: "note",
              title: "Average and marginal",
              text: "The average tells you what you pay over your whole profit. The last column tells you what happens with your next invoice. If you set aside based on the average, you often come up short at the end of a good year.",
            },
          ],
        },
        {
          id: "voorbeeld",
          title: "Worked example: what does Noor set aside?",
          blocks: [
            {
              kind: "p",
              text: `Noor is the fictional designer from our [demo](/demo). By mid-October 2026 she has booked ${w(s.omzetCents)} revenue and ${w(s.kostenCents)} expenses. VAT for the first three quarters is already filed and paid. This is how Mizara arrives at her set-aside:`,
            },
            {
              kind: "calc",
              title: "Set-aside on 15 October 2026 (fictional)",
              rows: [
                { label: "VAT on invoices in Q4", value: e(s.outputBtwCents) },
                { label: "VAT on expenses in Q4", value: e(s.inputBtwCents), sign: "minus" },
                { label: "VAT payable this quarter", value: e(s.btwPayableCents), strong: true },
                { label: "Income tax 2026 so far", value: e(s.ibCents) },
                { label: "Zvw contribution 2026 so far", value: e(s.zvwCents), sign: "plus" },
                { label: "2% margin", value: e(s.ibZvwBufferCents), sign: "plus" },
                { label: "Income tax and Zvw with margin", value: e(s.ibZvwBufferedCents), strong: true },
                { label: "Set aside, rounded up", value: w(s.setAsideCents), strong: true },
              ],
              note: `Income tax is already reduced by the general tax credit (${e(s.ahkCents)}) and the labour tax credit (${e(s.arbeidskortingCents)}).`,
            },
          ],
        },
        {
          id: "aanpak",
          title: "An approach that works",
          blocks: [
            {
              kind: "ol",
              items: [
                "**Open a separate savings account** for tax. What's in there isn't yours.",
                "**Set money aside with every payment**: all VAT, plus a share for income tax and Zvw.",
                "**Review every quarter**, around your VAT return. If business is better than expected, raise the share for income tax.",
                "**Adjust your provisional assessment** if your profit differs a lot from what the Belastingdienst expects. That avoids a large bill later.",
              ],
            },
            {
              kind: "p",
              text: "Mizara handles the first steps: after every invoice and expense it recalculates your set-aside. See the [tax overview](/functies/belastingoverzicht).",
            },
          ],
        },
        {
          id: "voorlopige-aanslag",
          title: "What about the provisional assessment?",
          blocks: [
            {
              kind: "p",
              text: "Many freelancers get a provisional assessment (voorlopige aanslag): the Belastingdienst estimates your income tax and Zvw in advance and you pay it in monthly instalments. What you already pay that way doesn't need to be set aside. If the estimate doesn't match your actual profit, change it in Mijn Belastingdienst.",
            },
            {
              kind: "callout",
              tone: "warn",
              text: "The estimate on this site doesn't account for a provisional assessment, tax partnership, box 2, loss relief or refunds.",
            },
          ],
        },
      ],
      sources: [src.box1, src.zelfstandigenaftrek, src.mkb, src.zvw, src.voorlopig, src.kvk],
      related: [
        { href: "/kennisbank/inkomstenbelasting-zzp", label: "Income tax for freelancers" },
        { href: "/kennisbank/btw-berekenen-zzp", label: "Calculating VAT as a freelancer" },
        { href: "/functies/belastingoverzicht", label: "The tax overview in Mizara" },
      ],
    },
    "btw-berekenen-zzp": {
      slug: "btw-berekenen-zzp",
      meta: {
        title: "Calculating VAT as a Dutch freelancer: rates, deduction and returns (2026)",
        description:
          "How to calculate VAT as a freelancer in the Netherlands: which rate, how to deduct VAT on costs, when to file and what goes on your invoice. With examples.",
      },
      h1: "Calculating VAT as a freelancer",
      lead: "VAT (btw) is the tax your client pays and you pass on. Once you know which rate to charge and which VAT you can deduct, the rest is a matter of keeping track.",
      shortAnswer:
        "Charge VAT on your amount excluding VAT: usually 21%, sometimes 9% or 0%. Deduct the VAT you pay on business costs. Pay the difference with your VAT return, usually quarterly, by the last day of the month after the quarter.",
      readMinutes: 5,
      sections: [
        {
          id: "tarieven",
          title: "Which rate do you charge?",
          blocks: [
            {
              kind: "table",
              head: ["Rate", "When", "Examples"],
              rows: [
                ["21%", "The standard rate", "Most services: design, consulting, software, construction"],
                ["9%", "The reduced rate", "Food, books, hairdressers, bicycle repair, passenger transport"],
                ["0%", "Mainly for cross-border trade", "Supplying goods outside the EU"],
                ["Exempt", "No VAT, and no deduction", "For example certain healthcare and education"],
              ],
            },
            {
              kind: "p",
              text: "Unsure about your rate? Check the Belastingdienst overview. For clients abroad, different rules often apply, such as reverse charge.",
            },
          ],
        },
        {
          id: "berekenen",
          title: "How to calculate it",
          blocks: [
            {
              kind: "calc",
              title: "From excluding to including",
              rows: [
                { label: "Amount excluding VAT", value: e(250_000) },
                { label: "× 21%", value: e(52_500), sign: "plus" },
                { label: "Amount including VAT", value: e(302_500), strong: true },
              ],
            },
            {
              kind: "calc",
              title: "Taking VAT out of an amount including VAT",
              rows: [
                { label: "Receipt including VAT", value: e(story.expense.inclCents) },
                { label: "Divided by 1.21", value: e(story.expense.exVatCents) },
                { label: "VAT on the receipt", value: e(story.expense.vatCents), strong: true },
              ],
              note: "At 9%, divide by 1.09.",
            },
          ],
        },
        {
          id: "aftrekken",
          title: "Deducting VAT on your costs",
          blocks: [
            {
              kind: "p",
              text: "VAT you pay on business purchases is called input VAT (voorbelasting). You deduct it from the VAT you charged. You need an invoice or receipt in your business name that meets the requirements. Some costs, such as private use or food and drink, are restricted.",
            },
            {
              kind: "calc",
              title: "Noor's VAT in Q4 so far (fictional)",
              rows: [
                { label: "VAT on invoices", value: e(s.outputBtwCents) },
                { label: "Input VAT on expenses", value: e(s.inputBtwCents), sign: "minus" },
                { label: "Payable", value: e(s.btwPayableCents), strong: true },
              ],
            },
          ],
        },
        {
          id: "aangifte",
          title: "When do you file?",
          blocks: [
            {
              kind: "p",
              text: "Most freelancers file VAT returns quarterly. The return and payment must arrive by the last day of the month after the quarter. Even if you invoiced nothing, you still file.",
            },
            {
              kind: "table",
              caption: "Deadlines for quarterly VAT returns and payment",
              head: ["Quarter", "Must arrive by"],
              rows: [
                ["Q1 2026", "30 April 2026"],
                ["Q2 2026", "31 July 2026"],
                ["Q3 2026", "31 October 2026"],
                ["Q4 2026", "31 January 2027"],
              ],
            },
            {
              kind: "p",
              text: "Mizara prepares the amounts per box. You copy them into Mijn Belastingdienst Zakelijk.",
            },
          ],
        },
        {
          id: "factuur",
          title: "VAT on your invoice",
          blocks: [
            {
              kind: "p",
              text: "Your invoice shows the amount excluding VAT, the VAT rate and the VAT amount per rate, alongside your VAT identification number and the other invoice requirements. Read more about [invoicing in Mizara](/functies/facturen).",
            },
          ],
        },
      ],
      sources: [src.btwTarieven, src.btwDatums, src.btwAangifte, src.factuureisen],
      related: [
        { href: "/kennisbank/kor-regeling", label: "The small business scheme (KOR)" },
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "How much tax to set aside?" },
        { href: "/functies/kosten", label: "Expenses and input VAT in Mizara" },
      ],
    },
    "inkomstenbelasting-zzp": {
      slug: "inkomstenbelasting-zzp",
      meta: {
        title: "Income tax for Dutch freelancers: how it's calculated (2026)",
        description:
          "From profit to income tax: self-employed deduction, starter deduction, SME profit exemption, rates, tax credits and Zvw in 2026. With a worked example.",
      },
      h1: "Income tax for freelancers: from profit to assessment",
      lead: "As a freelancer you pay income tax on your profit, after a few deductions. The Zvw contribution comes on top. Step by step, it looks like this.",
      shortAnswer:
        "Your profit is reduced by the self-employed deduction (€1,200 in 2026, if you meet the hours criterion), possibly the starter deduction (€2,123) and the SME profit exemption (12.7%). On what's left you pay 35.75% up to €38,883 and 37.56% above, minus tax credits. On top of that you pay 4.85% Zvw.",
      readMinutes: 7,
      sections: [
        {
          id: "stappen",
          title: "The steps",
          blocks: [
            {
              kind: "ol",
              items: [
                "**Profit**: revenue minus business costs and depreciation.",
                "**Entrepreneur's deduction**: the self-employed deduction (zelfstandigenaftrek) and, if you're starting out, the starter deduction (startersaftrek).",
                "**SME profit exemption** (mkb-winstvrijstelling): 12.7% of profit after the entrepreneur's deduction.",
                "**Taxable profit**: what's left. It falls in box 1, together with any other income.",
                "**Rates**: 35.75% up to €38,883, 37.56% up to €78,426 and 49.50% above.",
                "**Tax credits**: the general tax credit and the labour tax credit come off the tax. They shrink as you earn more.",
                "**Zvw contribution**: 4.85% of your taxable profit, up to a maximum of €79,409.",
              ],
            },
          ],
        },
        {
          id: "aftrek",
          title: "Self-employed deduction, starter deduction and the hours criterion",
          blocks: [
            {
              kind: "p",
              text: "The self-employed deduction is €1,200 in 2026. You get it if you're an entrepreneur for income tax and meet the hours criterion: at least 1,225 hours a year on your business, and usually more time on your business than on other work. Time spent on quotes, bookkeeping and finding clients counts too.",
            },
            {
              kind: "p",
              text: "If you weren't self-employed in one or more of the previous five years and used the self-employed deduction at most twice in that period, you also get €2,123 starter deduction.",
            },
            {
              kind: "callout",
              tone: "note",
              title: "Next year",
              text: "The self-employed deduction drops to €900 in 2027. The government has proposed sharply reducing the starter deduction from 2027; that proposal still needs approval from both houses of parliament.",
            },
          ],
        },
        {
          id: "voorbeeld",
          title: `Worked example: ${w(WORKED_PROFIT_CENTS)} profit`,
          blocks: [
            {
              kind: "calc",
              title: "Income tax and Zvw for 2026 (fictional)",
              rows: [
                { label: "Profit", value: e(worked.winstCents) },
                { label: "Self-employed deduction", value: e(worked.zelfstandigenaftrekCents), sign: "minus" },
                { label: "SME profit exemption (12.7%)", value: e(worked.mkbVrijstellingCents), sign: "minus" },
                { label: "Taxable profit", value: e(worked.belastbareWinstCents), strong: true },
                { label: "Box 1 tax", value: e(worked.box1Cents) },
                { label: "General tax credit", value: e(worked.ahkCents), sign: "minus" },
                { label: "Labour tax credit", value: e(worked.arbeidskortingCents), sign: "minus" },
                { label: "Income tax", value: e(worked.ibCents), strong: true },
                { label: "Zvw contribution (4.85%)", value: e(worked.zvwCents), sign: "plus" },
                { label: "Total", value: e(worked.ibZvwCents), strong: true },
              ],
              note: `With the starter deduction, the total would be ${e(workedStarter.ibZvwCents)}. Assumptions: no other income, no tax partner, no deductions outside the business. Calculated with the Mizara demo model.`,
            },
          ],
        },
        {
          id: "beperking",
          title: "Deductions capped at 37.56%",
          blocks: [
            {
              kind: "p",
              text: "If part of your income falls in the top bracket, a deduction saves you at most 37.56%, not 49.50%. This applies to the entrepreneur's deduction and the SME profit exemption, among others. The Belastingdienst applies this automatically in your return.",
            },
          ],
        },
        {
          id: "betalen",
          title: "How and when you pay",
          blocks: [
            {
              kind: "p",
              text: "You file a return each year for the previous year, usually before 1 May. With a provisional assessment you already pay during the year. Without one, the whole amount comes at once after your return. That's why it's smart to [set money aside every month](/kennisbank/hoeveel-belasting-apart-zetten-zzp).",
            },
          ],
        },
      ],
      sources: [src.box1, src.zelfstandigenaftrek, src.uren, src.mkb, src.zvw, src.kvk],
      related: [
        { href: "/kennisbank/hoeveel-belasting-apart-zetten-zzp", label: "How much tax to set aside?" },
        { href: "/functies/belastingoverzicht", label: "The tax overview in Mizara" },
        { href: "/demo", label: "Check it in the demo" },
      ],
    },
    "kor-regeling": {
      slug: "kor-regeling",
      meta: {
        title: "The Dutch small business scheme (KOR) explained (2026)",
        description:
          "What is the KOR, who can join, what are the pros and cons and what happens when you go over €20,000 revenue? Explained for freelancers.",
      },
      h1: "The small business scheme (KOR): when does it make sense?",
      lead: "With the KOR you don't charge VAT and don't file VAT returns. That saves work and can lower your prices for consumers. But you can't reclaim VAT either.",
      shortAnswer:
        "The KOR is a VAT exemption for businesses with at most €20,000 revenue a year, in the current year and the year before. You don't charge VAT and don't reclaim VAT. If you go over €20,000 during the year, you leave immediately and charge VAT again.",
      readMinutes: 5,
      sections: [
        {
          id: "voorwaarden",
          title: "Who can join?",
          blocks: [
            {
              kind: "ul",
              items: [
                "Your business is established in the Netherlands.",
                "Your revenue is at most €20,000 in the year you join and in the year before.",
                "What you supply is normally subject to VAT.",
              ],
            },
            {
              kind: "p",
              text: "Revenue for the KOR is what your clients pay, excluding VAT. You register in Mijn Belastingdienst Zakelijk, at least four weeks before you want to start.",
            },
          ],
        },
        {
          id: "afwegen",
          title: "Pros and cons",
          blocks: [
            {
              kind: "table",
              head: ["", "With KOR", "Without KOR"],
              rows: [
                ["VAT on your invoices", "No", "Yes"],
                ["VAT return", "No", "Usually quarterly"],
                ["Reclaim VAT on costs", "No", "Yes"],
                ["Works well if your clients are", "Consumers", "Businesses"],
              ],
            },
            {
              kind: "p",
              text: "If you mostly work for businesses, the KOR gains you little: they deduct the VAT on your invoice anyway. If you make big purchases, such as a new laptop or camera, the KOR means missing out on the VAT refund.",
            },
          ],
        },
        {
          id: "grens",
          title: "Going over €20,000",
          blocks: [
            {
              kind: "p",
              text: "As soon as your revenue in a year exceeds €20,000, you can no longer use the KOR. You leave immediately. The invoice that takes you over the threshold already carries VAT on the full amount.",
            },
            {
              kind: "calc",
              title: "Example",
              rows: [
                { label: "Revenue up to 15 September", value: "€19,750" },
                { label: "New job on 16 September", value: "€500" },
                { label: "Revenue after that", value: "€20,250", strong: true },
              ],
              note: "From 16 September the normal VAT rules apply. So you charge 21% VAT on the €500.",
            },
            {
              kind: "p",
              text: "After leaving, you can't rejoin for the rest of that year and the whole following year. You can also leave voluntarily, from the start of a new filing period and with at least four weeks' notice.",
            },
          ],
        },
        {
          id: "mizara",
          title: "The KOR in Mizara",
          blocks: [
            {
              kind: "p",
              text: "In Mizara you indicate whether you use the KOR. You then see how close you are to the €20,000 threshold. Without the KOR, you charge VAT per invoice and see what you pay each quarter.",
            },
          ],
        },
      ],
      sources: [src.korVoorwaarden, src.korAf, src.korAan],
      related: [
        { href: "/kennisbank/btw-berekenen-zzp", label: "Calculating VAT as a freelancer" },
        { href: "/voor-zzpers", label: "Who Mizara is for" },
        { href: "/functies/facturen", label: "Invoices in Mizara" },
      ],
    },
  },
};

import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { getDict } from "@/i18n";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { localePath } from "@/lib/routes";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";

/** Visible breadcrumb trail plus its BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ lang, crumbs }: { lang: Locale; crumbs: Crumb[] }) {
  const t = getDict(lang);
  const all = [{ name: t.common.nav.home, path: "" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, crumbs)} />
      <nav aria-label={t.common.a11y.breadcrumb} className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((crumb, index) => {
            const last = index === all.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink-soft">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={localePath(lang, crumb.path)} className="underline-offset-4 hover:text-ink hover:underline">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Standard page intro: breadcrumbs, h1 and lead. */
export function PageHeader({
  lang,
  crumbs,
  kicker,
  title,
  lead,
  children,
  size = "wide",
}: {
  lang: Locale;
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  size?: "wide" | "text";
}) {
  return (
    <header className="pb-10 pt-10 sm:pt-14 lg:pb-14 lg:pt-20">
      <Container size={size}>
        <Breadcrumbs lang={lang} crumbs={crumbs} />
        {kicker ? <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-carbon-deep dark:text-carbon">{kicker}</p> : null}
        <h1 className={`display t-h2 text-balance ${kicker ? "mt-3" : "mt-8"} max-w-4xl`}>{title}</h1>
        {lead ? <p className="t-lead mt-5 max-w-2xl text-pretty text-ink-soft">{lead}</p> : null}
        {children}
      </Container>
    </header>
  );
}

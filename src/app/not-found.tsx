import Link from "next/link";
import { Monogram } from "@/components/wordmark";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <Monogram className="mx-auto h-10 w-10" />
        <h1 className="display mt-6 text-2xl tracking-tight text-ink">
          Pagina niet gevonden
        </h1>
        <p className="mt-2 text-sm text-muted">
          Page not found.
        </p>
        <Link
          href="/nl"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-carbon px-4 py-2.5 text-sm font-medium text-white hover:bg-carbon-deep"
        >
          Mizara
        </Link>
      </div>
    </main>
  );
}

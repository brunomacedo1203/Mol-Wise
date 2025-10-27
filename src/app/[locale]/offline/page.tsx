import Link from "next/link";

type OfflineCopy = {
  title: string;
  description: string;
  reload: string;
  home: string;
  helper: string;
};

const OFFLINE_COPY: Record<string, OfflineCopy> = {
  en: {
    title: "You are offline",
    description: "Mol Class needs an internet connection for the latest data. We cached the main tools so you can keep exploring once you reconnect.",
    reload: "Try again",
    home: "Go back home",
    helper: "Reconnect to the internet and reload this page.",
  },
  pt: {
    title: "Você está offline",
    description: "O Mol Class precisa de conexão para buscar dados atualizados. As principais ferramentas serão carregadas assim que você se reconectar.",
    reload: "Tentar novamente",
    home: "Voltar ao início",
    helper: "Reconecte-se à internet e recarregue esta página.",
  },
};

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = OFFLINE_COPY[locale] ?? OFFLINE_COPY.en;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 shadow-lg shadow-black/5 dark:shadow-none">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span aria-hidden className="text-3xl">⚡</span>
          <span className="sr-only">{copy.title}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">{copy.title}</h1>
          <p className="text-sm text-muted-foreground">{copy.description}</p>
        </div>

        <p className="text-xs text-muted-foreground">{copy.helper}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href=""
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            {copy.reload}
          </a>
          <Link
            href={`/${locale}`}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  );
}

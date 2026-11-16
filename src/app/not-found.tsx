import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-ambient flex min-h-[70dvh] items-center px-6 pt-32">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-5">
        <span className="eyebrow">Errore 404</span>
        <h1 className="text-5xl font-semibold tracking-[-0.04em] text-ink">Pagina non trovata</h1>
        <p className="max-w-md text-ink-2">La pagina che cerchi non esiste o non è ancora disponibile.</p>
        <Link href="/" className="inline-flex h-11 items-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700">Torna alla Home</Link>
      </div>
    </section>
  );
}

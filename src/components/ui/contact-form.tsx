'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import { Icon } from '@/components/ui/icon';
import { integrations } from '@/lib/env';
import { fetchPolicy, newIdempotencyKey, submitRequest, type RequestPolicy, type RequestType } from '@/lib/site-requests';

const schema = z.object({
  name: z.string().trim().min(2, 'Inserisci il tuo nome.').max(120, 'Il nome è troppo lungo (massimo 120 caratteri).'),
  email: z.string().trim().email('Inserisci un indirizzo email valido.').max(254, 'L’indirizzo email è troppo lungo.'),
  phone: z.string().trim().max(40, 'Il numero è troppo lungo (massimo 40 caratteri).'),
  company: z.string().trim().max(160, 'Il nome dell’azienda è troppo lungo (massimo 160 caratteri).'),
  productInterest: z.string().trim().max(60),
  message: z.string().trim().min(10, 'Scrivi almeno qualche parola (10 caratteri).').max(4000, 'Il messaggio è troppo lungo (massimo 4000 caratteri).'),
  consent: z.literal(true, { error: 'Il consenso è necessario per inviare la richiesta.' }),
});

type Field = keyof z.infer<typeof schema>;
type Errors = Partial<Record<Field, string>>;
type Phase = 'idle' | 'sending' | 'sent' | 'throttled' | 'unavailable' | 'policy';

const field = 'w-full rounded-xl border border-border-default bg-white px-3.5 text-[15px] text-ink placeholder:text-n-400 focus:border-sky-500';

const copy: Record<RequestType, { submit: string; sent: string; messageLabel: string }> = {
  CONTACT: { submit: 'Invia la richiesta', sent: 'Abbiamo ricevuto la tua richiesta: ti risponderemo il prima possibile.', messageLabel: 'Messaggio' },
  DEMO: { submit: 'Richiedi la dimostrazione', sent: 'Abbiamo ricevuto la richiesta di dimostrazione: ti contatteremo per concordarla.', messageLabel: 'Cosa vorresti vedere?' },
  SUPPORT: { submit: 'Invia la richiesta di assistenza', sent: 'Abbiamo ricevuto la richiesta di assistenza: il team ti risponderà il prima possibile.', messageLabel: 'Descrivi il problema' },
};

interface Props {
  /** Tipo di richiesta registrata nella console Cedi Soft. */
  type?: RequestType;
  /** Recapiti alternativi mostrati se l'invio non è possibile. */
  toEmail: string;
  phones?: { label: string; href: string }[];
  /** Elenco prodotti per il campo «software di interesse» (opzionale). */
  productOptions?: string[];
  defaultProduct?: string;
}

/**
 * Modulo richieste: invia a `POST /api/public/site/requests` di Cedi Platform. Difese lato client: honeypot,
 * `renderedAt`, chiave di idempotenza stabile per invio; consenso con versione e digest dell'informativa
 * letti dalla Platform. I dati personali non vengono mai scritti in console né in log.
 */
export function ContactForm({ type = 'CONTACT', toEmail, phones = [], productOptions, defaultProduct = '' }: Readonly<Props>) {
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [policy, setPolicy] = useState<RequestPolicy | null>(null);
  const [policyState, setPolicyState] = useState<'loading' | 'ready' | 'failed'>(integrations.requestsEnabled ? 'loading' : 'failed');
  const renderedAt = useRef<string>('');
  const idempotencyKey = useRef<string>('');
  const resultRef = useRef<HTMLDivElement>(null);
  const t = copy[type];

  function loadPolicy(signal?: AbortSignal) {
    setPolicyState('loading');
    void fetchPolicy(signal).then((p) => {
      if (signal?.aborted) return;
      setPolicy(p);
      setPolicyState(p ? 'ready' : 'failed');
    });
  }

  useEffect(() => {
    renderedAt.current = new Date().toISOString();
    idempotencyKey.current = newIdempotencyKey();
    if (!integrations.requestsEnabled) return;
    const c = new AbortController();
    loadPolicy(c.signal);
    return () => c.abort();
  }, []);

  useEffect(() => { if (phase !== 'idle' && phase !== 'sending') resultRef.current?.focus(); }, [phase]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phase === 'sending') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const str = (k: string) => String(data.get(k) ?? '');
    const parsed = schema.safeParse({
      name: str('name'), email: str('email'), phone: str('phone'), company: str('company'),
      productInterest: str('productInterest'), message: str('message'), consent: data.get('consent') === 'on',
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as Field] ??= issue.message;
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    if (!policy) { setPhase('unavailable'); return; }
    const v = parsed.data;
    setPhase('sending');
    const result = await submitRequest({
      type, name: v.name, email: v.email, message: v.message,
      ...(v.phone ? { phone: v.phone } : {}), ...(v.company ? { company: v.company } : {}), ...(v.productInterest ? { productInterest: v.productInterest } : {}),
      consentAccepted: true, consentPolicyVersion: policy.version, consentPolicyDigest: policy.digest,
      idempotencyKey: idempotencyKey.current, renderedAt: renderedAt.current, website: str('website'),
    });
    if (result.ok) { form.reset(); idempotencyKey.current = newIdempotencyKey(); setPhase('sent'); return; }
    if (result.kind === 'invalid') {
      if (result.policy) { loadPolicy(); setPhase('policy'); return; }
      const known: Field[] = ['name', 'email', 'phone', 'company', 'productInterest', 'message', 'consent'];
      const f = known.find((k) => k === result.field);
      if (f) { setErrors({ [f]: 'Il valore inserito non è accettato: controllalo e riprova.' }); setPhase('idle'); form.querySelector<HTMLElement>(`[name="${f}"]`)?.focus(); return; }
      setPhase('unavailable'); return;
    }
    setPhase(result.kind);
  }

  const err = (k: Field) => (errors[k] ? <p id={`err-${k}`} className="text-[13px] text-[var(--error-fg)]" role="alert">{errors[k]}</p> : null);
  const aria = (k: Field) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `err-${k}` : undefined });

  const alternatives = (
    <>Puoi anche scrivere a <a className="font-medium underline" href={`mailto:${toEmail}`}>{toEmail}</a>
      {phones.length > 0 && <> o telefonare al {phones.map((p, i) => <span key={p.href}>{i > 0 && ' / '}<a className="font-medium underline" href={p.href}>{p.label}</a></span>)}</>}.</>
  );

  if (phase === 'sent') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="flex items-start gap-3 rounded-2xl bg-[var(--success-bg)] p-5 text-[15px] text-[var(--success-fg)] outline-none">
        <Icon name="check" size={20} className="mt-0.5 flex-none" /><p>{t.sent}</p>
      </div>
    );
  }

  const off = !integrations.requestsEnabled || policyState === 'failed';
  const busy = phase === 'sending';

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4" aria-busy={busy}>
      {off && (
        <p role="status" className="rounded-xl bg-[var(--warning-bg)] p-3.5 text-[14px] leading-snug text-[#6B4200]">
          Il modulo online non è al momento disponibile. {alternatives}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Nome e cognome
          <input name="name" autoComplete="name" maxLength={120} required aria-required className={`${field} h-12`} {...aria('name')} />{err('name')}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Email
          <input name="email" type="email" autoComplete="email" maxLength={254} required aria-required className={`${field} h-12`} {...aria('email')} />{err('email')}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Telefono <span className="font-normal text-ink-muted">(facoltativo)</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} className={`${field} h-12`} {...aria('phone')} />{err('phone')}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Azienda <span className="font-normal text-ink-muted">(facoltativo)</span>
          <input name="company" autoComplete="organization" maxLength={160} className={`${field} h-12`} {...aria('company')} />{err('company')}
        </label>
      </div>
      {productOptions && productOptions.length > 0 && (
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Software di interesse <span className="font-normal text-ink-muted">(facoltativo)</span>
          <select name="productInterest" defaultValue={defaultProduct} className={`${field} h-12`} {...aria('productInterest')}>
            <option value="">Non specificato</option>
            {productOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">{t.messageLabel}
        <textarea name="message" rows={5} maxLength={4000} required aria-required className={`${field} py-3`} {...aria('message')} />{err('message')}
      </label>

      {/* Honeypot: invisibile e fuori dal tab order. Una persona non lo compila mai. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Non compilare questo campo<input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-2">
          <input name="consent" type="checkbox" className="mt-0.5 size-4 accent-[var(--cs-blue)]" {...aria('consent')} />
          <span>Ho letto l’informativa e acconsento al trattamento dei dati per rispondere alla richiesta.</span>
        </label>
        {err('consent')}
        {policy && (
          <details className="rounded-xl bg-n-25 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-2">
            <summary className="cursor-pointer font-medium text-ink">Informativa sul trattamento dei dati{!policy.validated && ' (testo provvisorio)'}</summary>
            <p className="mt-2">{policy.text}</p>
          </details>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy || off} className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 text-[15px] font-medium text-white transition-[background,gap] duration-[220ms] hover:gap-3 hover:bg-blue-700 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? 'Invio in corso…' : t.submit}{!busy && <Icon name="arrow-right" size={16} />}
        </button>
        <div ref={resultRef} tabIndex={-1} role={phase === 'idle' || busy ? undefined : 'alert'} aria-live="polite" className="text-[13px] text-ink-muted outline-none">
          {phase === 'throttled' && <span className="text-[var(--error-fg)]">Non è stato possibile inviare la richiesta in questo momento. Riprova tra qualche minuto. {alternatives}</span>}
          {phase === 'unavailable' && <span className="text-[var(--error-fg)]">Invio non riuscito: i dati inseriti sono ancora qui, puoi riprovare. {alternatives}</span>}
          {phase === 'policy' && <span className="text-[var(--error-fg)]">L’informativa è stata aggiornata: leggila e riprova l’invio.</span>}
        </div>
      </div>
    </form>
  );
}

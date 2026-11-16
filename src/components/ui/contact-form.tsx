'use client';

import { useState } from 'react';
import { z } from 'zod';

import { Icon } from '@/components/ui/icon';

const schema = z.object({
  name: z.string().trim().min(2, 'Inserisci il tuo nome.'),
  email: z.string().trim().email('Inserisci un indirizzo email valido.'),
  subject: z.string().trim().min(3, 'Indica l’oggetto della richiesta.'),
  message: z.string().trim().min(10, 'Scrivi almeno qualche parola (10 caratteri).'),
  consent: z.literal(true, { error: 'Il consenso è necessario per inviare la richiesta.' }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field = 'w-full rounded-xl border border-border-default bg-white px-3.5 text-[15px] text-ink placeholder:text-n-400 focus:border-sky-500';

/**
 * Modulo contatti v1.0 senza backend: dopo la validazione apre il client email dell'utente con la
 * richiesta già compilata (mailto). Quando esisterà un endpoint, si sostituisce solo `onValid`.
 */
export function ContactForm({ toEmail, defaultSubject = '' }: Readonly<{ toEmail: string; defaultSubject?: string }>) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: data.get('name'), email: data.get('email'), subject: data.get('subject'),
      message: data.get('message'), consent: data.get('consent') === 'on',
    });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const v = parsed.data;
    const body = `${v.message}\n\n— ${v.name} (${v.email})`;
    window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    setDone(true);
  }

  const err = (k: keyof Errors) => (errors[k] ? <p id={`err-${k}`} className="text-[13px] text-[var(--error-fg)]" role="alert">{errors[k]}</p> : null);
  const aria = (k: keyof Errors) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `err-${k}` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Nome e cognome
          <input name="name" autoComplete="name" className={`${field} h-12`} {...aria('name')} />{err('name')}
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Email
          <input name="email" type="email" autoComplete="email" className={`${field} h-12`} {...aria('email')} />{err('email')}
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Oggetto
        <input name="subject" defaultValue={defaultSubject} className={`${field} h-12`} {...aria('subject')} />{err('subject')}
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">Messaggio
        <textarea name="message" rows={5} className={`${field} py-3`} {...aria('message')} />{err('message')}
      </label>
      <label className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-2">
        <input name="consent" type="checkbox" className="mt-0.5 size-4 accent-[var(--cs-blue)]" {...aria('consent')} />
        <span>Acconsento al trattamento dei dati per rispondere alla richiesta. <span className="text-ink-muted">[Informativa privacy da fornire]</span></span>
      </label>
      {err('consent')}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 text-[15px] font-medium text-white transition-[background,gap] duration-[220ms] hover:gap-3 hover:bg-blue-700 active:scale-[.98]">
          Prepara la richiesta<Icon name="arrow-right" size={16} />
        </button>
        <p className="text-[13px] text-ink-muted" role="status">
          {done ? 'Si è aperto il tuo programma di posta: invia il messaggio per completare la richiesta.' : 'Si aprirà il tuo programma di posta con il messaggio già compilato.'}
        </p>
      </div>
    </form>
  );
}

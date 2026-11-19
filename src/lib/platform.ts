import { env } from './env';

/**
 * Accesso alla Cedi Platform. La sola integrazione di v1.0: un link alla pagina di login esistente
 * (`<platform>/login`). Nessuna autenticazione, sessione o SSO duplicati in questo sito.
 *
 * `return_to` è supportato dalla Platform ma accetta solo origini registrate nel suo registro
 * delle surface: il sito istituzionale non lo è, quindi non lo inviamo.
 */
export function platformLoginUrl(): string {
  return new URL('/login', env.platformUrl).toString();
}

export interface ClientAreaLink { label: string; description: string; href: string; icon: string; external?: boolean }

/** Voci del pannello "Area Clienti": login Platform e due accessi esistenti su cedisoft.it. */
export function clientAreaLinks(): ClientAreaLink[] {
  return [
    { label: 'Area Clienti', description: 'Accedi con il tuo account Cedi Soft', href: platformLoginUrl(), icon: 'circle-user-round' },
    { label: 'Aggiornamenti software', description: 'Area riservata: download e aggiornamenti', href: '/aggiornamenti', icon: 'refresh-cw' },
    { label: 'Software in cloud', description: 'Accesso ai software in cloud', href: 'https://cloud.cedisoft.it/', icon: 'cloud', external: true },
  ];
}

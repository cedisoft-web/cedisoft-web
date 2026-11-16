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

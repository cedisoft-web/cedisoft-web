import { integrations } from './env';

/**
 * Client del modulo richieste pubblico di Cedi Platform (`/api/public/site/requests`).
 * Contratto: rapporto CRM-INTAKE-L1 (KB 52, doc 50). Gira nel browser: nessun segreto, nessun dato personale
 * nei log né in console (gli errori portano solo un codice).
 */
export type RequestType = 'CONTACT' | 'DEMO' | 'SUPPORT';

export interface RequestPolicy { version: string; digest: string; text: string; validated: boolean }

export interface SiteRequestPayload {
  type: RequestType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  productInterest?: string;
  consentAccepted: true;
  consentPolicyVersion: string;
  consentPolicyDigest: string;
  /** 8–64 caratteri [A-Za-z0-9_-]: lo stesso invio ripetuto non crea una seconda richiesta. */
  idempotencyKey: string;
  /** Istante in cui il modulo è stato mostrato (il server scarta compilazioni sotto i 2 secondi). */
  renderedAt: string;
  /** Honeypot: sempre vuoto per una persona. */
  website: string;
}

export type SubmitResult =
  | { ok: true }
  /** 400: `field` è il campo indicato dal server (`crm.invalid_<campo>`); `policy` = informativa cambiata nel frattempo. */
  | { ok: false; kind: 'invalid'; field?: string; policy?: boolean }
  /** 429, rifiuto neutro (honeypot, troppo veloce, limiti di frequenza): nessun dettaglio, di proposito. */
  | { ok: false; kind: 'throttled' }
  /** Rete assente, 5xx, risposta illeggibile o integrazione spenta. */
  | { ok: false; kind: 'unavailable' };

const endpoint = () => `${integrations.platformApiUrl}/api/public/site/requests`;

export function newIdempotencyKey(): string {
  const raw = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  return raw.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64).padEnd(8, '0');
}

export async function fetchPolicy(signal?: AbortSignal): Promise<RequestPolicy | null> {
  if (!integrations.requestsEnabled) return null;
  try {
    const r = await fetch(`${endpoint()}/policy`, { signal, headers: { accept: 'application/json' } });
    if (!r.ok) return null;
    const j = (await r.json()) as Partial<RequestPolicy>;
    return typeof j.version === 'string' && typeof j.digest === 'string' && typeof j.text === 'string'
      ? { version: j.version, digest: j.digest, text: j.text, validated: j.validated === true }
      : null;
  } catch { return null; }
}

async function errorCode(r: Response): Promise<{ code?: string; message?: string }> {
  try {
    const j = (await r.json()) as { error?: { code?: string; message?: string } };
    return { code: j.error?.code, message: j.error?.message };
  } catch { return {}; }
}

export async function submitRequest(payload: SiteRequestPayload, signal?: AbortSignal): Promise<SubmitResult> {
  if (!integrations.requestsEnabled) return { ok: false, kind: 'unavailable' };
  let r: Response;
  try {
    r = await fetch(endpoint(), { method: 'POST', signal, headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(payload) });
  } catch { return { ok: false, kind: 'unavailable' }; }
  if (r.ok) return { ok: true };
  if (r.status === 429) return { ok: false, kind: 'throttled' };
  if (r.status === 400 || r.status === 422) {
    const { code, message } = await errorCode(r);
    const m = /^crm\.invalid_(\w+)$/.exec(code ?? '');
    const field = m?.[1];
    return { ok: false, kind: 'invalid', field, policy: field === 'consent' && message === 'policy_mismatch' };
  }
  return { ok: false, kind: 'unavailable' };
}

import type { AssistProviders } from './types';

/**
 * Punto unico di collegamento dei provider. v1.0: nessun provider reale, quindi `null` in produzione
 * (l'interfaccia mostra solo i canali di contatto). Quando esisteranno API reali si restituiscono qui.
 * NEXT_PUBLIC_ASSIST_DEMO è sostituita a build-time: in produzione il ramo demo sparisce dal bundle.
 */
export async function loadAssistProviders(): Promise<AssistProviders | null> {
  if (process.env.NEXT_PUBLIC_ASSIST_DEMO === '1') {
    const { mockProviders } = await import('./mock-providers');
    return mockProviders;
  }
  return null;
}

import type { AIProvider, AssistProviders, LiveChatProvider, LiveSession, OperatorAvailability } from './types';

/**
 * Provider SIMULATI, solo per sviluppo e anteprima (NEXT_PUBLIC_ASSIST_DEMO=1).
 * Importati dinamicamente da loadAssistProviders(): in produzione il bundle non li contiene.
 */
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const ai: AIProvider = {
  async reply(history) {
    await wait(700);
    const last = history.filter((m) => m.role === 'user').at(-1)?.text.toLowerCase() ?? '';
    if (last.includes('simula errore')) throw new Error('demo-error');
    if (/demo|prova|preventiv/.test(last)) return { text: '[Demo] Per richiedere una dimostrazione usa il modulo nella pagina Azienda → Contatti.' };
    if (/park|autosalon/.test(last)) return { text: '[Demo] Gest Park è il gestionale per autosaloni. Trovi i dettagli nella sezione Software.' };
    return { text: '[Demo] Risposta simulata: l’assistente non è collegato a un’IA né ai dati aziendali.' };
  },
};

let availability: OperatorAvailability = 'available';
const live: LiveChatProvider = {
  async getAvailability() { return availability; },
  async start() {
    const listeners = new Set<(m: { text: string }) => void>();
    const session: LiveSession = {
      onMessage(l) { listeners.add(l); return () => listeners.delete(l); },
      async send() {
        await wait(1200);
        listeners.forEach((l) => l({ text: '[Demo] Messaggio dell’operatore simulato.' }));
      },
      async end() { listeners.clear(); },
    };
    return session;
  },
};

/** Solo demo: permette di forzare lo stato dall'interfaccia ("Simula stato"). */
export function setDemoAvailability(next: OperatorAvailability) { availability = next; }

export const mockProviders: AssistProviders = { ai, live, demo: true };

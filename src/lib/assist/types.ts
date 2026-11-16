/**
 * Contratti di Cedi Assist. L'interfaccia (components/assist) dipende solo da questi tipi:
 * le integrazioni reali (IA, live chat) implementeranno AIProvider / LiveChatProvider.
 */
export type ChatRole = 'user' | 'assistant' | 'operator' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  /** epoch ms */
  at: number;
  status?: 'sending' | 'error';
}

export interface AIProvider {
  /** Risponde all'ultimo messaggio utente. Può lanciare: l'interfaccia mostra lo stato di errore. */
  reply(history: readonly ChatMessage[], signal?: AbortSignal): Promise<Pick<ChatMessage, 'text'>>;
}

export type OperatorAvailability = 'available' | 'busy' | 'offline';

export interface LiveSession {
  /** Sottoscrive i messaggi in arrivo dall'operatore; restituisce la funzione di annullamento. */
  onMessage(listener: (message: Pick<ChatMessage, 'text'>) => void): () => void;
  send(text: string): Promise<void>;
  end(): Promise<void>;
}

export interface LiveChatProvider {
  getAvailability(): Promise<OperatorAvailability>;
  /** `context` = pagina di provenienza, per l'handoff dall'assistente. */
  start(context?: { page: string }): Promise<LiveSession>;
}

export interface AssistProviders {
  ai: AIProvider;
  live: LiveChatProvider;
  /** true = provider simulati: l'interfaccia lo dichiara esplicitamente. */
  demo: boolean;
}

/** Canali sempre disponibili, senza backend: nessun operatore simulato. */
export interface AssistFallbackChannels {
  supportHref: string;
  contactHref: string;
  phones: { label: string; href: string }[];
  email: string;
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { loadAssistProviders } from '@/lib/assist/load-providers';
import type { AssistProviders, ChatMessage, LiveSession, OperatorAvailability } from '@/lib/assist/types';

export type AssistView = 'home' | 'ai' | 'live';

const STORAGE_KEY = 'cedi-assist:v1';
const uid = () => Math.random().toString(36).slice(2);
const msg = (role: ChatMessage['role'], text: string, status?: ChatMessage['status']): ChatMessage =>
  ({ id: uid(), role, text, at: Date.now(), ...(status ? { status } : {}) });

/**
 * Logica di Cedi Assist, separata dall'interfaccia: stato del pannello, conversazioni e provider.
 * Senza provider (produzione v1.0) espone solo l'apertura/chiusura del pannello.
 */
export function useAssist() {
  const [providers, setProviders] = useState<AssistProviders | null>(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AssistView>('home');
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [availability, setAvailability] = useState<OperatorAvailability>('offline');
  const session = useRef<LiveSession | null>(null);
  const unsubscribe = useRef<(() => void) | null>(null);

  useEffect(() => {
    let alive = true;
    loadAssistProviders().then(async (p) => {
      if (!alive || !p) return;
      setProviders(p);
      setAvailability(await p.live.getAvailability());
    });
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setAiMessages((JSON.parse(saved) as { ai?: ChatMessage[] }).ai ?? []);
    } catch { /* sessionStorage non disponibile: la conversazione non persiste */ }
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ai: aiMessages })); } catch { /* ignora */ }
  }, [aiMessages]);

  const endLive = useCallback(async () => {
    unsubscribe.current?.();
    unsubscribe.current = null;
    await session.current?.end();
    session.current = null;
    setLiveMessages([]);
  }, []);

  const sendAi = useCallback(async (text: string) => {
    if (!providers) return;
    const history = [...aiMessages, msg('user', text)];
    setAiMessages(history);
    setPending(true);
    try {
      const r = await providers.ai.reply(history);
      setAiMessages((m) => [...m, msg('assistant', r.text)]);
    } catch {
      setAiMessages((m) => [...m, msg('assistant', 'Si è verificato un errore. Riprova oppure contatta il team di assistenza.', 'error')]);
    } finally { setPending(false); }
  }, [providers, aiMessages]);

  const startLive = useCallback(async () => {
    if (!providers || session.current) return;
    const s = await providers.live.start({ page: window.location.pathname });
    session.current = s;
    unsubscribe.current = s.onMessage((m) => { setPending(false); setLiveMessages((x) => [...x, msg('operator', m.text)]); });
  }, [providers]);

  const sendLive = useCallback(async (text: string) => {
    setLiveMessages((m) => [...m, msg('user', text)]);
    setPending(true);
    try { await session.current?.send(text); }
    catch { setPending(false); setLiveMessages((m) => [...m, msg('system', 'Messaggio non inviato.', 'error')]); }
  }, []);

  const go = useCallback((next: AssistView) => {
    setView(next);
    if (next === 'live') void startLive();
  }, [startLive]);

  const back = useCallback(() => {
    if (view === 'live') void endLive();
    setPending(false);
    setView('home');
  }, [view, endLive]);

  return {
    providers, open, setOpen, view, go, back, availability, setAvailability,
    aiMessages, liveMessages, pending, sendAi, sendLive,
    resetAi: () => setAiMessages([]),
  };
}

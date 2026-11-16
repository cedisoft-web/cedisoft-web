'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import type { ChatMessage } from '@/lib/assist/types';

/** Presentazionale: messaggi + composer. Non sa nulla di provider o rete. */
export function ChatThread({ messages, pending, placeholder, onSend, disabled, empty }: Readonly<{
  messages: readonly ChatMessage[]; pending: boolean; placeholder: string;
  onSend: (text: string) => void; disabled?: boolean; empty?: React.ReactNode;
}>) {
  const [text, setText] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [messages.length, pending]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || pending || disabled) return;
    setText('');
    onSend(value);
  }

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4" role="log" aria-live="polite" aria-label="Conversazione">
        {messages.length === 0 && empty}
        {messages.map((m) => (
          <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
              m.role === 'user' ? 'rounded-br-md bg-blue-600 text-white'
                : m.status === 'error' ? 'rounded-bl-md bg-[var(--error-bg)] text-[var(--error-fg)]'
                : 'rounded-bl-md bg-n-50 text-ink')}>
              {m.text}
            </div>
          </div>
        ))}
        {pending && (
          <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-n-50 px-3.5 py-3" aria-label="Sta scrivendo">
            {[0, 1, 2].map((i) => (
              <span key={i} data-csa-anim className="size-1.5 rounded-full bg-n-400 motion-safe:animate-[csa-dot_1.2s_infinite]" style={{ animationDelay: `${i * 160}ms` }} />
            ))}
          </div>
        )}
        <div ref={end} />
      </div>
      <form onSubmit={submit} className="flex flex-none items-center gap-2 border-t border-border-subtle p-3">
        <label className="sr-only" htmlFor="csa-input">Scrivi un messaggio</label>
        <input id="csa-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} disabled={disabled}
          autoComplete="off" className="h-11 min-w-0 flex-1 rounded-full border border-border-default bg-white px-4 text-sm text-ink placeholder:text-n-400 focus:border-sky-500 disabled:bg-n-50" />
        <button type="submit" aria-label="Invia" disabled={!text.trim() || pending || disabled}
          className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-n-200">
          <Icon name="send" size={17} />
        </button>
      </form>
    </>
  );
}

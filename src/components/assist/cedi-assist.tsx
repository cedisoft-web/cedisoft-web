'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { integrations } from '@/lib/env';
import type { AssistFallbackChannels, OperatorAvailability } from '@/lib/assist/types';

import { ChatThread } from './chat-thread';
import { LiveChatFrame } from './live-chat-frame';
import { useAssist } from './use-assist';

const statusMeta: Record<OperatorAvailability, { dot: string; text: string }> = {
  available: { dot: 'bg-green-500', text: 'Operatori disponibili' },
  busy: { dot: 'bg-[#E0A100]', text: 'Operatori occupati' },
  offline: { dot: 'bg-n-400', text: 'Operatori offline' },
};

const iconBtn = 'flex size-9 flex-none cursor-pointer items-center justify-center rounded-[10px] text-n-600 transition-colors hover:bg-blue-900/[.06] hover:text-ink';
const choice = 'flex cursor-pointer items-start gap-3.5 rounded-[18px] border border-border-subtle p-4 text-left transition-[border-color,transform,box-shadow] duration-[260ms] ease-out hover:border-sky-300 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-20px_rgba(25,44,88,.4)]';

/**
 * Launcher + pannello. v1.0 pubblico: solo canali di contatto reali (nessun operatore o IA simulati).
 * Con provider demo (anteprima/sviluppo) compaiono Assistente e Live Chat, dichiarati come DEMO.
 */
export function CediAssist({ channels }: Readonly<{ channels: AssistFallbackChannels }>) {
  const a = useAssist();
  const demo = a.providers?.demo === true;

  const { setOpen } = a;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  const title = a.view === 'ai' ? 'Assistente Cedi Soft' : a.view === 'live' || a.view === 'chat' ? 'Operatore' : 'Assistenza';
  const subtitle = a.view === 'live' ? statusMeta[a.availability].text : a.view === 'ai' ? 'Risposte simulate (demo)' : a.view === 'chat' ? 'Chat con il team Cedi Soft' : 'Cedi Soft';

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <button type="button" onClick={() => a.setOpen(!a.open)} aria-expanded={a.open} aria-controls="csa-panel"
        aria-label={a.open ? 'Chiudi assistenza' : 'Apri assistenza'}
        className={cn('pointer-events-auto fixed bottom-4 right-4 h-[58px] cursor-pointer items-center gap-2.5 rounded-full border border-white/80 bg-white/[.86] pl-2 pr-5 text-[15px] font-semibold text-ink backdrop-blur-[18px] backdrop-saturate-[1.6] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(25,44,88,.08),0_18px_40px_-18px_rgba(25,44,88,.45)] sm:bottom-6 sm:right-6',
          a.open ? 'hidden sm:flex' : 'flex')}>
        <span className="relative flex size-[42px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#274798,#459AD5)] text-white">
          {!a.open && <span data-csa-anim aria-hidden className="absolute inset-0 rounded-full border-2 border-sky-400 motion-safe:animate-[csa-ring_2.4s_infinite]" />}
          <Icon name={a.open ? 'x' : 'life-buoy'} size={20} />
        </span>
        <span>Assistenza</span>
      </button>

      <section id="csa-panel" role="dialog" aria-modal="false" aria-label={title} inert={!a.open}
        className={cn('pointer-events-auto fixed inset-0 flex origin-bottom-right flex-col overflow-hidden bg-white transition-[opacity,transform,visibility] duration-300 ease-out sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-border-subtle sm:shadow-[0_40px_80px_-32px_rgba(25,44,88,.5)]',
          a.open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0')}>
        <header className="flex flex-none items-center gap-2.5 border-b border-blue-900/[.07] px-3 py-3.5">
          {a.view !== 'home' && (
            <button type="button" onClick={a.back} aria-label="Indietro" className={iconBtn}><Icon name="arrow-left" /></button>
          )}
          <span className="relative flex size-10 flex-none items-center justify-center rounded-xl border border-blue-900/[.06] bg-n-25">
            {a.view === 'home'
              ? <Image src="/brand/cedisoft-symbol.png" alt="" width={24} height={24} className="h-auto w-6" />
              : <Icon name={a.view === 'ai' ? 'sparkles' : 'headset'} size={19} />}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-[15px] font-semibold leading-tight tracking-[-0.01em] text-ink">{title}</span>
            <span className="truncate text-xs leading-tight text-ink-2">{subtitle}</span>
          </span>
          {a.view === 'ai' && (
            <button type="button" onClick={a.resetAi} aria-label="Nuova conversazione" title="Nuova conversazione" className={iconBtn}><Icon name="rotate-ccw" size={17} /></button>
          )}
          <button type="button" onClick={() => a.setOpen(false)} aria-label="Chiudi" className={iconBtn}><Icon name="x" /></button>
        </header>

        {demo && (
          <div className="flex flex-none items-start gap-2 bg-[var(--warning-bg)] px-3 py-2 text-xs leading-snug text-[#6B4200]">
            <Icon name="flask-conical" size={14} className="mt-px flex-none" />
            Anteprima di sviluppo: IA e operatori sono simulati e nessun dato viene inviato.
          </div>
        )}

        {a.view === 'home' && (
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
            <div className="flex flex-col gap-1.5 px-1 pb-1 pt-2">
              <span className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink">Ciao, come possiamo aiutarti?</span>
              <span className="text-sm leading-relaxed text-ink-2">Scrivi al team di assistenza o consulta il centro assistenza.</span>
            </div>

            {demo && (
              <>
                <button type="button" onClick={() => a.go('ai')} className={cn(choice, 'bg-[linear-gradient(150deg,#fff,#F4F8FD)]')}>
                  <span className="flex size-[42px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(135deg,#274798,#459AD5)] text-white"><Icon name="sparkles" size={20} /></span>
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">Assistente Cedi Soft<Badge tone="info" mono>DEMO</Badge></span>
                    <span className="text-[13px] leading-snug text-ink-2">Risposte simulate su software e richieste di demo.</span>
                  </span>
                </button>
                <button type="button" onClick={() => a.go('live')} className={cn(choice, 'bg-white')}>
                  <span className="flex size-[42px] flex-none items-center justify-center rounded-xl border border-[rgba(35,111,40,.15)] bg-[#F1F8EF] text-green-700"><Icon name="headset" size={20} /></span>
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">Parla con un operatore<Badge tone="info" mono>DEMO</Badge></span>
                    <span className="flex items-center gap-2 text-[13px] text-ink-2"><span className={cn('size-2 rounded-full', statusMeta[a.availability].dot)} />{statusMeta[a.availability].text}</span>
                  </span>
                </button>
              </>
            )}

            {integrations.chatEnabled && (
              <button type="button" onClick={() => a.go('chat')} className={cn(choice, 'bg-white')}>
                <span className="flex size-[42px] flex-none items-center justify-center rounded-xl border border-[rgba(35,111,40,.15)] bg-[#F1F8EF] text-green-700"><Icon name="headset" size={20} /></span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">Chatta con un operatore</span>
                  <span className="text-[13px] leading-snug text-ink-2">Scrivi al team in tempo reale. Se nessuno è online ti proponiamo il modulo di richiesta.</span>
                </span>
              </button>
            )}

            <Link href={channels.contactHref} onClick={() => a.setOpen(false)} className={cn(choice, 'bg-white')}>
              <span className="flex size-[42px] flex-none items-center justify-center rounded-xl bg-sky-50 text-blue-600"><Icon name="mail" size={20} /></span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-[15px] font-semibold text-ink">Scrivici</span>
                <span className="text-[13px] leading-snug text-ink-2">Invia una richiesta al team di assistenza: {channels.email}</span>
              </span>
            </Link>
            <div className="grid gap-2">
              {channels.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex items-center gap-2 rounded-[14px] bg-n-25 p-3 text-[13px] font-medium text-ink hover:bg-sky-50"><Icon name="phone" size={16} />Chiama {p.label}</a>
              ))}
              <Link href={channels.supportHref} onClick={() => a.setOpen(false)} className="flex items-center gap-2 rounded-[14px] bg-n-25 p-3 text-[13px] font-medium text-ink hover:bg-sky-50"><Icon name="life-buoy" size={16} />Centro assistenza</Link>
            </div>
          </div>
        )}

        {a.view === 'ai' && (
          <ChatThread messages={a.aiMessages} pending={a.pending} placeholder="Scrivi una domanda…" onSend={a.sendAi}
            empty={<p className="rounded-xl bg-n-25 p-3 text-sm text-ink-2">Chiedimi di Gest Park, delle demo o dei servizi. Scrivi «simula errore» per vedere lo stato di errore.</p>} />
        )}

        {a.view === 'chat' && integrations.chatEnabled && <LiveChatFrame onClose={() => a.setOpen(false)} />}

        {a.view === 'live' && (
          <>
            <div className="flex flex-none items-center gap-2 border-b border-blue-900/[.06] bg-n-25 px-3.5 py-2">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[.06em] text-ink-muted">Simula stato</span>
              <div role="radiogroup" aria-label="Simula disponibilità operatori" className="ml-auto flex gap-0.5 rounded-full bg-[#EEF1F6] p-0.5">
                {(Object.keys(statusMeta) as OperatorAvailability[]).map((s) => (
                  <button key={s} type="button" role="radio" aria-checked={a.availability === s} onClick={() => a.setAvailability(s)}
                    className={cn('inline-flex h-[26px] cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-ink', a.availability === s && 'bg-white shadow-xs')}>
                    <span className={cn('size-[7px] rounded-full', statusMeta[s].dot)} />{s === 'available' ? 'Libero' : s === 'busy' ? 'Occupato' : 'Offline'}
                  </button>
                ))}
              </div>
            </div>
            <ChatThread messages={a.liveMessages} pending={a.pending} placeholder="Scrivi all’operatore…" onSend={a.sendLive} disabled={a.availability === 'offline'}
              empty={<p className="rounded-xl bg-n-25 p-3 text-sm text-ink-2">{a.availability === 'offline' ? 'Nessun operatore online: usa “Scrivici” dalla schermata iniziale.' : 'Conversazione simulata: nessun operatore reale è collegato.'}</p>} />
          </>
        )}
      </section>
    </div>
  );
}

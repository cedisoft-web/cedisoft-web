'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Icon } from '@/components/ui/icon';
import { integrations } from '@/lib/env';

/**
 * Live Chat reale di Cedi Platform: il widget è una pagina servita dalla Platform (`/api/public/chat/widget?site=<chiave>`),
 * incorniciata qui. Viene montato solo quando il visitatore apre la chat: nessun costo su LCP né richieste a freddo.
 * Nome, email e consenso li chiede il widget stesso; se nessun operatore è online il widget mostra il pulsante verso
 * il modulo di richiesta (URL configurato nel sito chat della Platform) e sotto c'è comunque il nostro ripiego.
 * Nessun dato della conversazione passa da questo sito.
 */
export function LiveChatFrame({ onClose }: Readonly<{ onClose: () => void }>) {
  const [loaded, setLoaded] = useState(false);
  const src = `${integrations.chatUrl}/api/public/chat/widget?site=${encodeURIComponent(integrations.chatSiteKey)}`;
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1 bg-n-25">
        {!loaded && <p role="status" className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-ink-2">Connessione alla chat in corso…</p>}
        <iframe
          title="Chat con un operatore Cedi Soft"
          src={src}
          onLoad={() => setLoaded(true)}
          referrerPolicy="no-referrer"
          allow=""
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <div className="flex flex-none items-center gap-2 border-t border-blue-900/[.07] bg-white px-4 py-3 text-[13px] text-ink-2">
        <Icon name="mail" size={15} className="flex-none" />
        <span>Preferisci scrivere? <Link href="/assistenza#richiesta" onClick={onClose} className="font-medium text-blue-600 underline">Invia una richiesta di assistenza</Link></span>
      </div>
    </div>
  );
}

import { socialLinks } from '@/content/data/social';
import { cn } from '@/lib/cn';

const paths: Record<string, React.ReactNode> = {
  facebook: <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.9" cy="7.1" r="1.1" />
    </>
  ),
};

/** Icone dei profili Facebook e Instagram. `tone="dark"` per i fondi scuri. */
export function SocialLinks({ className, tone = 'light' }: Readonly<{ className?: string; tone?: 'light' | 'dark' }>) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((s) => (
        <li key={s.id}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} di Cedi Soft`}
            className={cn('flex size-10 items-center justify-center rounded-full border transition-colors',
              tone === 'dark' ? 'border-white/30 text-white hover:bg-white/15' : 'border-blue-900/[.12] bg-white text-blue-700 hover:border-sky-500 hover:text-blue-600')}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden>{paths[s.id]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

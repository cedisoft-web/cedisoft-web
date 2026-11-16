import { cn } from '@/lib/cn';

const tones = {
  warning: 'bg-[var(--warning-bg)] text-[var(--warning-fg)]',
  info: 'bg-sky-50 text-blue-600',
  neutral: 'bg-[#EEF1F6] text-ink-2',
  success: 'bg-[var(--success-bg)] text-[var(--success-fg)]',
} as const;

export function Badge({ tone = 'neutral', mono, className, children }: Readonly<{
  tone?: keyof typeof tones; mono?: boolean; className?: string; children: React.ReactNode;
}>) {
  return (
    <span className={cn('inline-flex h-[18px] items-center rounded-full px-1.5 text-[10px] font-semibold leading-none', mono && 'font-mono font-medium tracking-[.04em]', tones[tone], className)}>
      {children}
    </span>
  );
}

/** Data in italiano (es. «17 novembre 2026») da ISO 8601 o yyyy-MM-dd; fuso Europe/Rome, stringa originale se non valida. */
export function formatDate(iso: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00Z`) : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(d);
}

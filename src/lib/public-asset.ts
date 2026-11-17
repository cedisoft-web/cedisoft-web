import { existsSync } from 'node:fs';
import path from 'node:path';

/** Restituisce l'URL pubblico di un file in /public solo se esiste (verificato a build-time), altrimenti null. */
export function publicAsset(rel: string): string | null {
  return existsSync(path.join(process.cwd(), 'public', rel)) ? `/${rel}` : null;
}

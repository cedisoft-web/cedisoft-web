import { ImageResponse } from 'next/og';

export const alt = 'Cedi Soft — Software che semplifica. Tecnologia che evolve.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Immagine di condivisione predefinita (colori del brand). Sostituibile con un'immagine approvata. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg,#192C58 0%,#274798 55%,#459AD5 100%)', color: '#fff' }}>
        <div style={{ fontSize: 34, letterSpacing: 4, opacity: 0.85 }}>CEDI SOFT · DAL 1989</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          <div>Software che semplifica.</div>
          <div style={{ color: '#9CE59A' }}>Tecnologia che evolve.</div>
        </div>
      </div>
    ),
    size,
  );
}

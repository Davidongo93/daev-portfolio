import { siteConfig } from '../../config/site';

// TRM oficial (USD→COP) — Datos Abiertos de Colombia (datos.gov.co).
const TRM_URL =
  'https://www.datos.gov.co/resource/32sa-8pi3.json?$select=valor,vigenciadesde&$order=vigenciadesde%20DESC&$limit=1';

export type Trm = {
  /** Valor de 1 USD en COP. */
  value: number;
  /** Fecha de vigencia de la lectura, en formato YYYY-MM-DD. */
  date: string;
  /** true si proviene de la API; false si se usó el respaldo del config. */
  live: boolean;
};

/**
 * Lee la TRM del día desde la API oficial, revalidando cada 24 h.
 * Si la API falla o devuelve datos inválidos, retorna la última lectura
 * válida guardada en el config (con su fecha) marcada como `live: false`.
 */
export async function getTrm(): Promise<Trm> {
  const fallback: Trm = {
    value: siteConfig.pricing.trmUsdToCop,
    date: siteConfig.pricing.trmDate,
    live: false,
  };

  try {
    const res = await fetch(TRM_URL, {
      next: { revalidate: 86400 }, // 24 horas
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return fallback;

    const data: Array<{ valor?: string; vigenciadesde?: string }> =
      await res.json();
    const row = Array.isArray(data) ? data[0] : undefined;
    const value = row?.valor ? Number(row.valor) : NaN;
    const date = row?.vigenciadesde ? String(row.vigenciadesde).slice(0, 10) : '';

    if (!Number.isFinite(value) || value <= 0 || !date) return fallback;

    return { value, date, live: true };
  } catch {
    return fallback;
  }
}

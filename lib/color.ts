/**
 * Utilitaires de contraste pour les couleurs d'accent par pôle.
 *
 * Les couleurs de marque des pôles (bleu PLANÈTE, vert CleanTech, navy FRS…)
 * sont parfois trop sombres pour servir de TEXTE sur le fond sombre du site.
 * `accentForText` éclaircit la teinte (mélange vers le blanc) jusqu'à atteindre
 * le ratio de contraste WCAG AA (≥ 4.5:1), en conservant l'identité de la marque.
 * La couleur brute reste utilisée pour les APLATS (fond de CTA, texte blanc).
 */
type RGB = [number, number, number]

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '').trim()
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const int = parseInt(n, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

function rgbToHex([r, g, b]: RGB): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function luminance([r, g, b]: RGB): number {
  const f = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(hexToRgb(a))
  const lb = luminance(hexToRgb(b))
  const hi = Math.max(la, lb)
  const lo = Math.min(la, lb)
  return (hi + 0.05) / (lo + 0.05)
}

/**
 * Renvoie une variante de `hex` lisible (contraste AA) sur `bg`.
 * Éclaircit par paliers si nécessaire. `bg` par défaut = surface sombre du site.
 */
export function accentForText(hex: string, bg = '#0B0B0C', target = 4.5): string {
  if (!hex) return hex
  const bgRgb = hexToRgb(bg)
  const base = hexToRgb(hex)
  if (contrastRatio(hex, bg) >= target) return rgbToHex(base)
  for (let t = 0.05; t <= 1.0001; t += 0.05) {
    const mixed: RGB = [
      base[0] + (255 - base[0]) * t,
      base[1] + (255 - base[1]) * t,
      base[2] + (255 - base[2]) * t,
    ]
    if (contrastRatio(rgbToHex(mixed), bg) >= target) return rgbToHex(mixed)
  }
  return '#FFFFFF'
}

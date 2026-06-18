import { cn } from '@/lib/utils'

interface Props {
  className?: string
  /** `rich` = 4 blobs (hero) · `subtle` = 2 blobs (sections). */
  density?: 'subtle' | 'rich'
}

/**
 * Arrière-plan « bulles d'eau » liquides.
 *
 * Blobs flous animés (rouge de marque + neutres) qui flottent lentement façon
 * lampe à lave, SOUS les surfaces en verre qui les réfractent. Composant serveur
 * (pur CSS, aucun JS). Garde-fous gérés dans globals.css :
 *  - `prefers-reduced-motion` → animation désactivée ;
 *  - mobile → flou réduit & opacité moindre (GPU) ;
 *  - utilise uniquement `transform`/`opacity` (jamais de propriété de layout).
 */
export default function LiquidBackground({ className, density = 'rich' }: Props) {
  return (
    <div className={cn('liquid-bg', className)} aria-hidden>
      <span
        className="liquid-blob animate-blob-1"
        style={{
          top: '-12%',
          left: '-6%',
          width: 'clamp(260px, 42vw, 560px)',
          height: 'clamp(260px, 42vw, 560px)',
          background:
            'radial-gradient(circle at 35% 35%, rgba(229,51,35,0.85), rgba(229,51,35,0) 68%)',
        }}
      />
      <span
        className="liquid-blob animate-blob-2"
        style={{
          top: '12%',
          right: '-10%',
          width: 'clamp(240px, 38vw, 520px)',
          height: 'clamp(240px, 38vw, 520px)',
          background:
            'radial-gradient(circle at 50% 50%, rgba(194,38,26,0.7), rgba(194,38,26,0) 70%)',
        }}
      />
      {density === 'rich' && (
        <>
          <span
            className="liquid-blob animate-blob-3"
            style={{
              bottom: '-18%',
              left: '22%',
              width: 'clamp(220px, 36vw, 480px)',
              height: 'clamp(220px, 36vw, 480px)',
              background:
                'radial-gradient(circle at 50% 50%, rgba(120,120,130,0.35), rgba(120,120,130,0) 70%)',
            }}
          />
          <span
            className="liquid-blob animate-blob-1"
            style={{
              bottom: '-8%',
              right: '14%',
              width: 'clamp(180px, 28vw, 360px)',
              height: 'clamp(180px, 28vw, 360px)',
              animationDelay: '-7s',
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,51,35,0.45), rgba(229,51,35,0) 72%)',
            }}
          />
        </>
      )}
    </div>
  )
}

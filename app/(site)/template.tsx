/**
 * Transition de page douce (fondu).
 *
 * `template.tsx` est ré-instancié à chaque navigation : l'animation `fade-in`
 * rejoue donc à chaque changement de page. Sous `prefers-reduced-motion`,
 * globals.css neutralise la durée d'animation → apparition instantanée.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>
}

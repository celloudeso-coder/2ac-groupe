import { Zap, Shield, Handshake, Layers, Star } from 'lucide-react'

/** Mappe le nom d'icône (stocké en base) vers le composant lucide. */
const VALUE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  shield: Shield,
  handshake: Handshake,
  layers: Layers,
}

export default function ValueIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = VALUE_ICONS[name ?? ''] ?? Star
  return <Icon className={className} aria-hidden />
}

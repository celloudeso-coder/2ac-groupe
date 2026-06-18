import { getSiteSettings } from '@/lib/content'
import SettingsForm from '@/components/admin/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function ParametresPage() {
  const settings = await getSiteSettings()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Paramètres du site</h1>
        <p className="mt-1 text-sm text-muted">
          Coordonnées, horaires et informations affichés dans l&apos;en-tête, le pied de page et les pages de contact.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  )
}

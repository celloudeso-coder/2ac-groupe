import { requireAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAdmin()

  let pendingCount = 0
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')
    pendingCount = count ?? 0
  } catch {
    // tableau de bord reste accessible même si la requête échoue
  }

  return (
    <AdminShell email={auth.email} pendingCount={pendingCount}>
      {children}
    </AdminShell>
  )
}

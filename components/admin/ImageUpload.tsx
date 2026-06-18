'use client'

import { useState } from 'react'
import { Upload, Loader2, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

interface Props {
  bucket: string
  value: string | null
  onChange: (url: string | null) => void
  label?: string
}

/** Upload réutilisable vers Supabase Storage (renvoie l'URL publique). */
export default function ImageUpload({ bucket, value, onChange }: Props) {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez choisir un fichier image.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image trop lourde (max 5 Mo).')
      return
    }
    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (error) throw error
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onChange(data.publicUrl)
      toast.success('Image téléversée.')
    } catch {
      toast.error("Échec du téléversement. Vérifiez vos droits et réessayez.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Aperçu"
            className="h-32 w-auto max-w-full rounded-xl border border-line object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow-glow-sm"
            aria-label="Retirer l'image"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-line bg-surface/40 text-faint">
          <ImageIcon className="h-8 w-8" aria-hidden />
        </div>
      )}

      <label className="btn-outline cursor-pointer text-sm">
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Téléversement…
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" aria-hidden />
            {value ? 'Remplacer l’image' : 'Téléverser une image'}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />
      </label>
    </div>
  )
}

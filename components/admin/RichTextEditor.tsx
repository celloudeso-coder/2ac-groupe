'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
        active ? 'bg-brand text-white' : 'text-muted hover:bg-ink/10 hover:text-ink'
      )}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL du lien :', previous ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-line p-2">
      <ToolbarButton label="Gras" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Italique" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolbarButton label="Titre 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Titre 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolbarButton label="Liste à puces" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Liste numérotée" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Citation" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Lien" active={editor.isActive('link')} onClick={addLink}>
        <LinkIcon className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-line" aria-hidden />
      <ToolbarButton label="Annuler" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton label="Rétablir" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" aria-hidden />
      </ToolbarButton>
    </div>
  )
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    immediatelyRender: false, // évite les erreurs d'hydratation SSR (Next.js)
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: placeholder ?? 'Rédigez le contenu…' }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose-2ac min-h-[220px] max-w-none px-4 py-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // Synchronise si la valeur initiale change (ex : chargement asynchrone).
  useEffect(() => {
    if (editor && value && editor.isEmpty) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface/40">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ContactSubmission } from '@/lib/types'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Server-side validation
    const { type, full_name, email, phone, subject, message, consent } = body as ContactSubmission

    if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide.' }, { status: 400 })
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }
    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message trop court (minimum 10 caractères).' }, { status: 400 })
    }
    if (!consent) {
      return NextResponse.json({ error: 'Le consentement est requis.' }, { status: 400 })
    }

    const payload: ContactSubmission = {
      type: type === 'devis' ? 'devis' : 'contact',
      full_name: full_name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 200),
      phone: phone ? String(phone).trim().slice(0, 30) : undefined,
      subject: subject ? String(subject).trim().slice(0, 200) : undefined,
      message: message.trim().slice(0, 3000),
      consent: true,
    }

    // Store in Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert(payload)

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't expose DB errors to client — still try to send email
    }

    // Send notification email via Resend (optional — graceful degradation)
    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL ?? 'contact@2ac-gn.com'
    // Tant que le domaine n'est pas vérifié dans Resend, onboarding@resend.dev
    // est l'expéditeur autorisé par défaut.
    const fromEmail = process.env.RESEND_FROM ?? 'onboarding@resend.dev'

    if (resendKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: fromEmail,
          to: contactEmail,
          replyTo: payload.email,
          subject: `[2AC GROUPE] Nouveau message — ${payload.subject ?? payload.type}`,
          text: [
            `Type : ${payload.type}`,
            `Nom : ${payload.full_name}`,
            `Email : ${payload.email}`,
            `Téléphone : ${payload.phone ?? 'Non renseigné'}`,
            `Sujet : ${payload.subject ?? 'Non renseigné'}`,
            `Message :\n${payload.message}`,
          ].join('\n'),
        })
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
        // Email failure doesn't fail the request
      }
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur interne. Veuillez réessayer.' }, { status: 500 })
  }
}

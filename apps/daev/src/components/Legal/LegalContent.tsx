'use client';
import Link from 'next/link';
import { useLang } from '../../context/LangContext';
import { siteConfig } from '../../config/site';

type LegalType = 'privacy' | 'data-deletion';

interface Section {
  heading: string;
  paragraphs: string[];
}
interface Doc {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}

const EMAIL = siteConfig.email;
const UPDATED = '2026-06-28';

const docs: Record<LegalType, { es: Doc; en: Doc }> = {
  privacy: {
    es: {
      title: 'Política de Privacidad',
      updated: `Última actualización: ${UPDATED}`,
      intro: `Esta política describe cómo ${siteConfig.name} ("DÆV", "yo") trata tus datos personales en ${siteConfig.siteUrl}, en particular en el sistema de comentarios y reacciones del blog.`,
      sections: [
        {
          heading: '1. Datos que recojo',
          paragraphs: [
            'Inicio de sesión: si entras con Google o Facebook, recibo tu nombre, tu dirección de correo electrónico y tu foto de perfil pública, únicamente para identificarte en los comentarios.',
            'Contenido: los comentarios, respuestas y reacciones que publicas se almacenan junto con tu identificador de usuario y la fecha.',
            'Técnicos: una cookie de sesión para mantener tu sesión iniciada, y datos mínimos de verificación anti-spam (Cloudflare Turnstile).',
          ],
        },
        {
          heading: '2. Para qué los uso',
          paragraphs: [
            'Exclusivamente para permitirte comentar, responder y reaccionar en las entradas del blog, y para moderar y prevenir spam y abuso. No vendo ni comparto tus datos con fines publicitarios.',
          ],
        },
        {
          heading: '3. Proveedores que intervienen',
          paragraphs: [
            'Google y Facebook (autenticación), Cloudflare Turnstile (protección anti-spam), Neon (base de datos PostgreSQL) y Vercel (alojamiento). Cada uno trata los datos según sus propias políticas.',
          ],
        },
        {
          heading: '4. Conservación',
          paragraphs: [
            'Conservo tus comentarios y tu cuenta hasta que los elimines o solicites la eliminación. Al borrar tu cuenta se eliminan también tus comentarios y reacciones asociados.',
          ],
        },
        {
          heading: '5. Tus derechos',
          paragraphs: [
            'Puedes acceder, corregir o eliminar tus datos en cualquier momento. Puedes borrar tus propios comentarios al iniciar sesión, o solicitar la eliminación completa de tu cuenta y datos.',
            `Para ejercer estos derechos, consulta la página de eliminación de datos o escríbeme a ${EMAIL}.`,
          ],
        },
        {
          heading: '6. Contacto',
          paragraphs: [`Responsable: ${siteConfig.name}. Correo: ${EMAIL}.`],
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      updated: `Last updated: ${UPDATED}`,
      intro: `This policy describes how ${siteConfig.name} ("DÆV", "I") handles your personal data on ${siteConfig.siteUrl}, specifically the blog's comments and reactions system.`,
      sections: [
        {
          heading: '1. Data I collect',
          paragraphs: [
            'Sign-in: if you log in with Google or Facebook, I receive your name, email address and public profile photo, solely to identify you in comments.',
            'Content: the comments, replies and reactions you post are stored with your user id and a timestamp.',
            'Technical: a session cookie to keep you logged in, and minimal anti-spam verification data (Cloudflare Turnstile).',
          ],
        },
        {
          heading: '2. How I use it',
          paragraphs: [
            'Only to let you comment, reply and react on blog posts, and to moderate and prevent spam and abuse. I do not sell or share your data for advertising.',
          ],
        },
        {
          heading: '3. Processors involved',
          paragraphs: [
            'Google and Facebook (authentication), Cloudflare Turnstile (anti-spam), Neon (PostgreSQL database) and Vercel (hosting). Each handles data under its own policy.',
          ],
        },
        {
          heading: '4. Retention',
          paragraphs: [
            'I keep your comments and account until you delete them or request deletion. Deleting your account also removes your associated comments and reactions.',
          ],
        },
        {
          heading: '5. Your rights',
          paragraphs: [
            'You can access, correct or delete your data at any time. You can delete your own comments while signed in, or request full deletion of your account and data.',
            `To exercise these rights, see the data deletion page or email me at ${EMAIL}.`,
          ],
        },
        {
          heading: '6. Contact',
          paragraphs: [`Controller: ${siteConfig.name}. Email: ${EMAIL}.`],
        },
      ],
    },
  },
  'data-deletion': {
    es: {
      title: 'Eliminación de datos del usuario',
      updated: `Última actualización: ${UPDATED}`,
      intro: `Si iniciaste sesión con Google o Facebook para comentar en ${siteConfig.siteUrl}, puedes eliminar tus datos en cualquier momento de dos formas:`,
      sections: [
        {
          heading: 'Opción 1 — Eliminar tú mismo',
          paragraphs: [
            'Inicia sesión, ve a cualquiera de tus comentarios y usa el botón "Eliminar". Esto borra el contenido de ese comentario inmediatamente.',
          ],
        },
        {
          heading: 'Opción 2 — Eliminación completa de la cuenta',
          paragraphs: [
            `Escríbeme a ${EMAIL} desde el correo asociado a tu cuenta, con el asunto "Eliminar mis datos".`,
            'Eliminaré tu registro de usuario y todos tus comentarios y reacciones en un plazo máximo de 30 días, y te confirmaré por correo cuando se complete.',
          ],
        },
        {
          heading: 'Qué se elimina',
          paragraphs: [
            'Tu nombre, correo y foto recibidos del proveedor, junto con todos tus comentarios, respuestas y reacciones almacenados en la base de datos.',
          ],
        },
      ],
    },
    en: {
      title: 'User Data Deletion',
      updated: `Last updated: ${UPDATED}`,
      intro: `If you signed in with Google or Facebook to comment on ${siteConfig.siteUrl}, you can delete your data at any time in two ways:`,
      sections: [
        {
          heading: 'Option 1 — Delete it yourself',
          paragraphs: [
            'Sign in, go to any of your comments and use the "Delete" button. This removes that comment\'s content immediately.',
          ],
        },
        {
          heading: 'Option 2 — Full account deletion',
          paragraphs: [
            `Email me at ${EMAIL} from the address associated with your account, with the subject "Delete my data".`,
            'I will delete your user record and all your comments and reactions within 30 days, and confirm by email once done.',
          ],
        },
        {
          heading: 'What gets deleted',
          paragraphs: [
            'Your name, email and photo received from the provider, along with all your comments, replies and reactions stored in the database.',
          ],
        },
      ],
    },
  },
};

export default function LegalContent({ type }: { type: LegalType }) {
  const { lang } = useLang();
  const doc = docs[type][lang];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-16 animate-fade-in">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-fore mb-2">{doc.title}</h1>
      <p className="text-sm text-muted mb-8">{doc.updated}</p>

      <p className="text-fore/90 leading-relaxed mb-8">{doc.intro}</p>

      <div className="space-y-8">
        {doc.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display font-semibold text-xl text-fore mb-3">{s.heading}</h2>
            <div className="space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-4 text-sm">
        <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">
          {EMAIL}
        </a>
        {type === 'privacy' ? (
          <Link href="/data-deletion" className="text-accent hover:underline">
            {lang === 'es' ? 'Eliminar mis datos →' : 'Delete my data →'}
          </Link>
        ) : (
          <Link href="/privacy" className="text-accent hover:underline">
            {lang === 'es' ? 'Política de Privacidad →' : 'Privacy Policy →'}
          </Link>
        )}
      </div>
    </main>
  );
}

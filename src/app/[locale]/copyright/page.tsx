import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.splatoonraiders.wiki'
  const path = '/copyright'

  return {
    title: 'Copyright Notice - Splatoon Raiders Wiki',
    description:
      'Copyright and trademark notice for Splatoon Raiders Wiki, including fair use and DMCA reporting information.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Splatoon Raiders Wiki',
      title: 'Copyright Notice - Splatoon Raiders Wiki',
      description: 'Copyright and trademark information for Splatoon Raiders Wiki.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Splatoon Raiders Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Copyright Notice - Splatoon Raiders Wiki',
      description: 'Copyright and trademark information for Splatoon Raiders Wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Intellectual property and attribution terms</p>
          <p className="text-slate-400 text-sm">Last Updated: April 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Ownership</h2>
            <p>
              Unless otherwise noted, original text and site content on Splatoon Raiders Wiki are © 2026
              Splatoon Raiders Wiki.
            </p>

            <h2>2. Game Assets and Trademarks</h2>
            <p>
              Splatoon Raiders, Splatoon, Nintendo trademarks, logos, character names, and related media
              are the property of Nintendo and their respective owners.
            </p>

            <h2>3. Fair Use</h2>
            <p>
              We may display limited game-related assets for commentary, informational reference, and
              educational fan documentation under fair use principles.
            </p>

            <h2>4. Reuse Rules</h2>
            <ul>
              <li>You may link to our pages freely.</li>
              <li>You may quote short excerpts with clear attribution.</li>
              <li>You may not republish our full guides without permission.</li>
            </ul>

            <h2>5. DMCA / Copyright Claims</h2>
            <p>
              If you believe your copyrighted work appears on this website without authorization, send a
              detailed claim including your contact information, work identification, and claimed URL.
            </p>
            <p>
              <strong>DMCA Contact:</strong>{' '}
              <a
                href="mailto:dmca@splatoonraiders.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                dmca@splatoonraiders.wiki
              </a>
            </p>

            <h2>6. General Copyright Contact</h2>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:copyright@splatoonraiders.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                copyright@splatoonraiders.wiki
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}

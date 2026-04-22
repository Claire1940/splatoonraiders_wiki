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
  const path = '/terms-of-service'

  return {
    title: 'Terms of Service - Splatoon Raiders Wiki',
    description:
      'Terms of Service for Splatoon Raiders Wiki. Learn the rules and conditions for using this fan-run information website.',
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
      title: 'Terms of Service - Splatoon Raiders Wiki',
      description: 'Terms and conditions for using Splatoon Raiders Wiki.',
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
      title: 'Terms of Service - Splatoon Raiders Wiki',
      description: 'Terms and conditions for using Splatoon Raiders Wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Rules for using Splatoon Raiders Wiki</p>
          <p className="text-slate-400 text-sm">Last Updated: April 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using Splatoon Raiders Wiki, you agree to these Terms of Service. If you do not agree,
              do not use this website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Splatoon Raiders Wiki is an unofficial fan-made information website. We provide guides,
              summaries, and reference material related to Splatoon Raiders.
            </p>

            <h2>3. User Conduct</h2>
            <ul>
              <li>Use the site lawfully and respectfully</li>
              <li>Do not attempt unauthorized access or automated abuse</li>
              <li>Do not scrape or republish our original content at scale without permission</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Splatoon Raiders and related trademarks, logos, and official assets belong to Nintendo and
              respective rights holders. Our original editorial text and site code belong to this website.
            </p>

            <h2>5. No Warranty</h2>
            <p>
              Content is provided "as is" for informational use. We do not guarantee that all information
              is complete, accurate, or always current.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect or consequential damages
              arising from use of this website.
            </p>

            <h2>7. External Links</h2>
            <p>
              This site links to third-party services such as Nintendo pages, YouTube, Reddit, and X.
              We are not responsible for third-party content or policies.
            </p>

            <h2>8. Changes</h2>
            <p>
              We may update these terms at any time. Continued use after updates means you accept the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about these terms can be sent to:{' '}
              <a
                href="mailto:legal@splatoonraiders.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                legal@splatoonraiders.wiki
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

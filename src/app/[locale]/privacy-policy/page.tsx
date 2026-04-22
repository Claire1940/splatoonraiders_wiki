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
  const path = '/privacy-policy'

  return {
    title: 'Privacy Policy - Splatoon Raiders Wiki',
    description:
      'Privacy Policy for Splatoon Raiders Wiki. Learn what data we collect, why we collect it, and how we protect visitor privacy.',
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
      title: 'Privacy Policy - Splatoon Raiders Wiki',
      description: 'How Splatoon Raiders Wiki handles visitor privacy and analytics data.',
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
      title: 'Privacy Policy - Splatoon Raiders Wiki',
      description: 'How Splatoon Raiders Wiki handles visitor privacy and analytics data.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How we collect, use, and protect your information</p>
          <p className="text-slate-400 text-sm">Last Updated: April 22, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              This Privacy Policy explains how Splatoon Raiders Wiki (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
              handles information when you visit and use our website.
            </p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, device information, and basic
                request logs.
              </li>
              <li>
                <strong>Usage Data:</strong> Page views, session length, and interaction events through
                privacy-focused analytics tooling.
              </li>
              <li>
                <strong>Preference Data:</strong> Language/theme preferences stored in your browser.
              </li>
            </ul>

            <h2>3. How We Use Data</h2>
            <ul>
              <li>Operate and maintain the website</li>
              <li>Improve performance, accessibility, and content quality</li>
              <li>Measure site usage trends and detect abuse</li>
            </ul>

            <h2>4. Cookies and Analytics</h2>
            <p>
              We may use cookies or similar storage mechanisms for essential site behavior and analytics.
              You can control cookies through browser settings.
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our pages include links to Nintendo, YouTube, Reddit, X, and other external platforms.
              Their privacy practices are governed by their own policies.
            </p>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              This website is not intended to collect personal data from children under 13. If you
              believe a child has submitted personal information to us, contact us and we will remove it.
            </p>

            <h2>7. Data Retention and Security</h2>
            <p>
              We retain only the minimum data necessary for operation and analytics and apply reasonable
              safeguards to protect it.
            </p>

            <h2>8. Policy Updates</h2>
            <p>
              We may update this policy when features or legal requirements change. The effective date at
              the top of this page reflects the latest revision.
            </p>

            <h2>9. Contact</h2>
            <p>
              For privacy requests or questions, contact:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:privacy@splatoonraiders.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                privacy@splatoonraiders.wiki
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

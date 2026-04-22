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
  const path = '/about'

  return {
    title: 'About Splatoon Raiders Wiki',
    description:
      'Learn about Splatoon Raiders Wiki, an independent fan resource focused on release tracking, trailers, co-op details, and gameplay references.',
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
      title: 'About Splatoon Raiders Wiki',
      description: 'About the mission and scope of Splatoon Raiders Wiki.',
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
      title: 'About Splatoon Raiders Wiki',
      description: 'About the mission and scope of Splatoon Raiders Wiki.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Splatoon Raiders Wiki</h1>
          <p className="text-slate-300 text-lg mb-2">
            A fan-maintained information hub for Splatoon Raiders
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Goal</h2>
            <p>
              Splatoon Raiders Wiki exists to make official information easier to track and verify. We focus on
              release date updates, trailers, gameplay systems, co-op details, and important Nintendo source links.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li>Official release timeline and platform availability</li>
              <li>Trailer archive and announcement summaries</li>
              <li>Gameplay systems, characters, and gear references</li>
              <li>Co-op and multiplayer information</li>
              <li>Amiibo and pre-order related updates</li>
            </ul>

            <h2>Editorial Principles</h2>
            <ul>
              <li>Prioritize official sources</li>
              <li>Mark speculation clearly</li>
              <li>Update pages quickly after official announcements</li>
              <li>Keep guides concise and searchable</li>
            </ul>

            <h2>Independence Notice</h2>
            <p>
              Splatoon Raiders Wiki is an unofficial fan-made website and is not affiliated with Nintendo.
              All game trademarks and assets belong to their respective owners.
            </p>

            <h2>Contact</h2>
            <p>
              For feedback, corrections, or collaboration:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:contact@splatoonraiders.wiki"
                className="text-[hsl(var(--nav-theme-light))] hover:underline"
              >
                contact@splatoonraiders.wiki
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

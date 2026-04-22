import { getLatestArticles } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.splatoonraiders.wiki'
const HOME_IMAGE = `${SITE_URL}/images/hero.webp`

const homeConfig = {
  videoId: 'Jaag4cVKOo8',
  videoTitle: 'Splatoon Raiders — Release Date Revealed — Nintendo',
  links: {
    heroPrimary: 'https://www.youtube.com/watch?v=Jaag4cVKOo8',
    heroSecondary: 'https://www.nintendo.com/us/store/products/splatoon-raiders-switch-2/',
    ctaCommunity: 'https://www.reddit.com/r/splatoon/',
    ctaGame: 'https://www.nintendo.com/us/store/products/splatoon-raiders-switch-2/',
    supportCommunity: 'https://www.reddit.com/r/splatoon/',
    supportGame: 'https://www.nintendo.com/us/store/products/splatoon-raiders-switch-2/',
    footerNews:
      'https://www.nintendo.com/us/whatsnew/splatoon-raiders-makes-a-splash-with-a-new-treasure-hunting-trailer/',
    footerTwitter: 'https://x.com/SplatoonNA',
    footerReddit: 'https://www.reddit.com/r/splatoon/',
    footerOfficial: 'https://www.nintendo.com/us/store/products/splatoon-raiders-switch-2/',
    footerYouTube: 'https://www.youtube.com/watch?v=Jaag4cVKOo8',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Splatoon Raiders - Release Date, Trailer & Co-op',
    description:
      'Splatoon Raiders hub for the latest release date, trailer, co-op details, characters, weapons, islands, amiibo, and official Nintendo Switch 2 news.',
    alternates: buildLanguageAlternates('/', locale as Locale, SITE_URL),
    openGraph: {
      type: 'website',
      url: locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: 'Splatoon Raiders Wiki',
      title: 'Splatoon Raiders - Release Date, Trailer & Co-op',
      description:
        'Track the release date, latest trailer, co-op details, characters, weapons, islands, amiibo, price, and every confirmed Nintendo update for Splatoon Raiders.',
      images: [
        {
          url: HOME_IMAGE,
          width: 1920,
          height: 1080,
          alt: 'Splatoon Raiders Key Art',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Splatoon Raiders - Release Date, Trailer & Co-op',
      description:
        'Track the release date, latest trailer, co-op details, characters, weapons, islands, amiibo, and official Nintendo updates.',
      images: [HOME_IMAGE],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  // Keep homepage module titles as plain text (no internal URL linking); lucide-react icons are rendered in HomePageClient.
  const moduleLinkMap = {} as ModuleLinkMap

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      homeConfig={homeConfig}
    />
  )
}

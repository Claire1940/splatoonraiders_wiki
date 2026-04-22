import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content'

export interface ArticleLink {
  url: string
  title: string
}

export type ModuleLinkMap = Record<string, ArticleLink | null>

interface ArticleWithType extends ContentItem {
  contentType: string
}

// Module sub-field mapping: moduleKey -> { field, nameKey }
const MODULE_FIELDS: Record<string, { field: string; nameKey: string }> = {
  lucidBlocksBeginnerGuide: { field: 'steps', nameKey: 'title' },
  lucidBlocksApotheosisCrafting: { field: 'cards', nameKey: 'name' },
  lucidBlocksToolsAndWeapons: { field: 'items', nameKey: 'name' },
  lucidBlocksStorageAndInventory: { field: 'solutions', nameKey: 'name' },
  lucidBlocksQualiaAndBaseBuilding: { field: 'cards', nameKey: 'name' },
  lucidBlocksWorldRegions: { field: 'regions', nameKey: 'name' },
  lucidBlocksCreaturesAndEnemies: { field: 'creatures', nameKey: 'name' },
  lucidBlocksMobilityGear: { field: 'items', nameKey: 'name' },
  lucidBlocksFarmingAndGrowth: { field: 'sections', nameKey: 'name' },
  lucidBlocksBestEarlyUnlocks: { field: 'priorities', nameKey: 'name' },
  lucidBlocksAchievementTracker: { field: 'groups', nameKey: 'name' },
  lucidBlocksSingleplayerAndPlatformFAQ: { field: 'faqs', nameKey: 'question' },
  lucidBlocksSteamDeckAndController: { field: 'items', nameKey: 'title' },
  lucidBlocksSettingsAndAccessibility: { field: 'items', nameKey: 'title' },
  lucidBlocksUpdatesAndPatchNotes: { field: 'specs', nameKey: 'spec' },
  lucidBlocksCrashFixAndTroubleshooting: { field: 'cards', nameKey: 'title' },
}

// Extra semantic keywords per module to boost matching for h2 titles
// These supplement the module title text when matching against articles
const MODULE_EXTRA_KEYWORDS: Record<string, string[]> = {
  lucidBlocksBeginnerGuide: ['release date', 'launch day', 'trailer', 'leaks', 'trademark', 'cancelled'],
  lucidBlocksApotheosisCrafting: ['trailer', 'announcement', 'reveal', 'nintendolife', 'ign', 'twitter'],
  lucidBlocksToolsAndWeapons: ['gameplay', 'walkthrough', 'genre', 'details', 'map', 'demo'],
  lucidBlocksStorageAndInventory: ['pre order', 'amazon', 'game card', 'switch 2 bundle', 'file size', 'gameshare'],
  lucidBlocksQualiaAndBaseBuilding: ['price', 'digital', 'physical', 'amazon', 'switch 2 bundle', 'game card'],
  lucidBlocksWorldRegions: ['multiplayer', 'coop', 'online', 'local', 'turf war', 'gameshare'],
  lucidBlocksCreaturesAndEnemies: ['news', 'updates', 'leaks', 'trademark', 'twitter', 'reddit'],
  lucidBlocksMobilityGear: ['story', 'lore', 'spirhalite islands', 'details', 'map', 'single player'],
  lucidBlocksFarmingAndGrowth: ['deep cut', 'shiver', 'frye', 'big man', 'agent 4', 'inkling'],
  lucidBlocksBestEarlyUnlocks: ['customization', 'hairstyles', 'outfits', 'main character', 'engineer', 'octoling'],
  lucidBlocksAchievementTracker: ['weapons', 'rollers', 'salmonids', 'combat', 'exploration bot', 'guide'],
  lucidBlocksSingleplayerAndPlatformFAQ: ['spirhalite islands', 'cyclone', 'map', 'story', 'lore', 'details'],
  lucidBlocksSteamDeckAndController: ['salmonids', 'enemy', 'combat', 'turf war', 'coop', 'guide'],
  lucidBlocksSettingsAndAccessibility: ['exploration bot', 'companion', 'mechanic', 'deep cut', 'gadget', 'engineer'],
  lucidBlocksUpdatesAndPatchNotes: ['file size', 'storage', 'switch 2', 'game card', 'languages', 'online'],
  lucidBlocksCrashFixAndTroubleshooting: ['amiibo', 'shiver', 'frye', 'big man', 'release date', 'collectible'],
}

const FILLER_WORDS = ['splatoon', 'raiders', '2026', '2025', 'complete', 'the', 'and', 'for', 'how', 'with', 'our', 'this', 'your', 'all', 'from', 'learn', 'master']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSignificantTokens(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 2 && !FILLER_WORDS.includes(w))
}

function matchScore(queryText: string, article: ArticleWithType, extraKeywords?: string[]): number {
  const normalizedQuery = normalize(queryText)
  const normalizedTitle = normalize(article.frontmatter.title)
  const normalizedDesc = normalize(article.frontmatter.description || '')
  const normalizedSlug = article.slug.replace(/-/g, ' ').toLowerCase()

  let score = 0

  // Exact phrase match in title (stripped of "Splatoon Raiders")
  const strippedQuery = normalizedQuery.replace(/splatoon raiders?\s*/g, '').trim()
  const strippedTitle = normalizedTitle.replace(/splatoon raiders?\s*/g, '').trim()
  if (strippedQuery.length > 3 && strippedTitle.includes(strippedQuery)) {
    score += 100
  }

  // Token overlap from query text
  const queryTokens = getSignificantTokens(queryText)
  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 20
    if (normalizedDesc.includes(token)) score += 5
    if (normalizedSlug.includes(token)) score += 15
  }

  // Extra keywords scoring (for module h2 titles)
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const normalizedKw = normalize(kw)
      if (normalizedTitle.includes(normalizedKw)) score += 15
      if (normalizedDesc.includes(normalizedKw)) score += 5
      if (normalizedSlug.includes(normalizedKw)) score += 10
    }
  }

  return score
}

function findBestMatch(
  queryText: string,
  articles: ArticleWithType[],
  extraKeywords?: string[],
  threshold = 20,
): ArticleLink | null {
  let bestScore = 0
  let bestArticle: ArticleWithType | null = null

  for (const article of articles) {
    const score = matchScore(queryText, article, extraKeywords)
    if (score > bestScore) {
      bestScore = score
      bestArticle = article
    }
  }

  if (bestScore >= threshold && bestArticle) {
    return {
      url: `/${bestArticle.contentType}/${bestArticle.slug}`,
      title: bestArticle.frontmatter.title,
    }
  }

  return null
}

export async function buildModuleLinkMap(locale: Language): Promise<ModuleLinkMap> {
  // 1. Load all articles across all content types
  const allArticles: ArticleWithType[] = []
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    for (const item of items) {
      allArticles.push({ ...item, contentType })
    }
  }

  // 2. Load module data from en.json (use English for keyword matching)
  const enMessages = (await import('../locales/en.json')).default as any

  const linkMap: ModuleLinkMap = {}

  // 3. For each module, match h2 title and sub-items
  for (const [moduleKey, fieldConfig] of Object.entries(MODULE_FIELDS)) {
    const moduleData = enMessages.modules?.[moduleKey]
    if (!moduleData) continue

    // Match module h2 title (use extra keywords + lower threshold for broader matching)
    const moduleTitle = moduleData.title as string
    if (moduleTitle) {
      const extraKw = MODULE_EXTRA_KEYWORDS[moduleKey] || []
      linkMap[moduleKey] = findBestMatch(moduleTitle, allArticles, extraKw, 15)
    }

    // Match sub-items
    const subItems = moduleData[fieldConfig.field] as any[]
    if (Array.isArray(subItems)) {
      for (let i = 0; i < subItems.length; i++) {
        const itemName = subItems[i]?.[fieldConfig.nameKey] as string
        if (itemName) {
          const key = `${moduleKey}::${fieldConfig.field}::${i}`
          linkMap[key] = findBestMatch(itemName, allArticles)
        }
      }
    }
  }

  return linkMap
}

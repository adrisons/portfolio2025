import { cache } from "react"
import { XMLParser } from "fast-xml-parser"

export interface RssPost {
  id: string
  title: string
  excerpt: string
  date: string
  url: string
  imageUrl: string
}

export const fetchRssFeed = cache(async (feedUrl: string, placeholderImage: string): Promise<{ posts: RssPost[], description: string }> => {
  const response = await fetch(feedUrl, {
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.status}`)
  }

  const xmlData = await response.text()
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  })

  const result = parser.parse(xmlData)
  const channel = result.rss?.channel

  if (!channel || !channel.item) {
    return { posts: [], description: "No description available." }
  }

  const items = Array.isArray(channel.item) ? channel.item : [channel.item]

  const posts = items.slice(0, 3).map((item: any, index: number) => {
    // Extract image URL from enclosure if available
    let imageUrl = placeholderImage
    if (item.enclosure && item.enclosure["@_url"]) {
      imageUrl = item.enclosure["@_url"]
    }

    // Format date
    let date = new Date()
    try {
      if (item.pubDate) {
        date = new Date(item.pubDate)
      }
    } catch (e) {
      console.error("Error parsing date:", e)
    }

    return {
      id: index.toString(),
      title: item.title || "Untitled Post",
      excerpt: item.description?.substring(0, 150).replace(/<[^>]*>/g, "") || "No description available",
      date: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      url: item.link || "#",
      imageUrl,
    }
  })

  return {
    posts,
    description: channel.description || "No description available.",
  }
})


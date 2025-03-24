import { cache } from "react"

export interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  fork: boolean
}

export interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  languages: Record<string, number>
}

export const fetchGitHubRepos = cache(async (username: string): Promise<Repository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`)
    }

    const repos = await response.json()
    return repos.filter((repo: Repository) => !repo.fork)
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return []
  }
})

export const fetchGitHubStats = cache(async (username: string): Promise<GitHubStats | null> => {
  try {
    const repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch repositories: ${res.status}`)
      return res.json()
    })

    // Calculate stats
    let totalStars = 0
    let totalForks = 0
    const languages: Record<string, number> = {}

    repos.forEach((repo: any) => {
      totalStars += repo.stargazers_count
      totalForks += repo.forks_count

      if (repo.language && !languages[repo.language]) {
        languages[repo.language] = 0
      }
      if (repo.language) {
        languages[repo.language]++
      }
    })

    return {
      totalStars,
      totalForks,
      totalRepos: repos.length,
      languages,
    }
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return null
  }
})


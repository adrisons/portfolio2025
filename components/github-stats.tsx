import { fetchGitHubStats } from "@/lib/github"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Star, GitFork, Code } from "lucide-react"
import { ClientProgressBar } from "./client-progress-bar"

export async function GitHubStats({ username }: { username: string }) {
  const stats = await fetchGitHubStats(username)

  if (!stats) {
    return (
      <section id="github-stats" className="py-16">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          GitHub Activity
        </h2>
        <p className="text-center py-12 text-gray-400">Failed to load GitHub stats</p>
      </section>
    )
  }

  // Sort languages by usage count
  const sortedLanguages = Object.entries(stats.languages)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)

  const totalLanguageCount = sortedLanguages.reduce((sum, [, count]) => sum + count, 0)

  return (
    <section id="github-stats" className="py-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        GitHub Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" /> Stars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalStars}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <GitFork className="w-4 h-4 text-blue-400" /> Forks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalForks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" /> Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalRepos}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-4 h-4" /> Top Languages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedLanguages.map(([language, count]) => (
            <div key={language} className="space-y-1">
              <div className="flex justify-between">
                <span>{language}</span>
                <span className="text-gray-400">{Math.round((count / totalLanguageCount) * 100)}%</span>
              </div>
              <ClientProgressBar value={(count / totalLanguageCount) * 100} language={language} />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}


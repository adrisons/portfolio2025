import { fetchGitHubStats, fetchGitHubRepos } from "@/lib/github"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientProgressBar } from "./client-progress-bar"
import { ClientProjectCard } from "./client-project-card"
import { Button } from "@/components/ui/button"
import { FaStar, FaCodeBranch, FaCode } from "react-icons/fa"

export async function GitHubSection({ username }: { username: string }) {
  const token = process.env.GITHUB_TOKEN; // Access the token directly
  if (!token) {
    console.error("GITHUB_TOKEN is missing");
    return (
      <section id="github" className="py-16">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          GitHub Activity
        </h2>
        <p className="text-center py-12 text-gray-400">Failed to load GitHub stats</p>
      </section>
    );
  }

  const stats = await fetchGitHubStats(username, token);
  const projects = await fetchGitHubRepos(username, token);
  // Display only the 4 most recent projects
  const recentProjects = projects.slice(0, 4)

  if (!stats) {
    return (
      <section id="github" className="py-16">
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
    <section id="github" className="py-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        GitHub Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <FaStar className="w-4 h-4 text-yellow-400" /> Stars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalStars}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <FaCodeBranch className="w-4 h-4 text-blue-400" /> Forks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalForks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <FaCode className="w-4 h-4 text-purple-400" /> Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalRepos}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCode className="w-4 h-4" /> Top Languages
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

        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Recent Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map((project, index) => (
              <ClientProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-700">
              <a
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaCodeBranch className="w-4 h-4" />
                View All Repositories
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


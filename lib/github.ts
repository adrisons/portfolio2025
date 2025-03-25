import { cache } from "react";

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: Record<string, number>;
}

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is set in your environment variables

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  const token = GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    console.error("GITHUB_TOKEN is missing or undefined");
  }

  return headers;
}

export const fetchGitHubRepos = cache(
  async (username: string): Promise<Repository[]> => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("GitHub API error response:", errorText);
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos = await response.json();
      return repos.filter((repo: Repository) => !repo.fork);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      return [];
    }
  }
);

export const fetchGitHubStats = cache(
  async (username: string): Promise<GitHubStats | null> => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${username}/repos?per_page=100`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("GitHub API error response:", errorText);
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos = await response.json();

      // Calculate stats
      let totalStars = 0;
      let totalForks = 0;
      const languages: Record<string, number> = {};

      repos.forEach((repo: Repository) => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      return {
        totalStars,
        totalForks,
        totalRepos: repos.length,
        languages,
      };
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return null;
    }
  }
);

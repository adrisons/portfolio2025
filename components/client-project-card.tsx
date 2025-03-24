"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import { AnimatedBorderCard } from "@/components/ui/animated-border-card"
import type { Repository } from "@/lib/github"

interface ClientProjectCardProps {
  project: Repository
  index: number
}

export function ClientProjectCard({ project, index }: ClientProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <AnimatedBorderCard>
        <Card className="bg-gray-900 border-gray-800 flex flex-col h-full border-transparent">
          <CardHeader>
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || "No description provided"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.language && (
                <Badge variant="outline" className="bg-gray-800 text-gray-300">
                  {project.language}
                </Badge>
              )}
              {project.topics &&
                project.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="outline" className="bg-gray-800 text-gray-300">
                    {topic}
                  </Badge>
                ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4" />
                <span>{project.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCodeBranch className="w-4 h-4" />
                <span>{project.forks_count}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-4 h-4 mr-2" /> Code
              </a>
            </Button>
            {project.homepage && (
              <Button variant="default" size="sm" className="w-full" asChild>
                <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="w-4 h-4 mr-2" /> Demo
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </AnimatedBorderCard>
    </motion.div>
  )
}


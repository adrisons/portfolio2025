"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCalendarAlt } from "react-icons/fa"
import { motion } from "framer-motion"
import { AnimatedBorderCard } from "@/components/ui/animated-border-card"

interface NewsletterCardProps {
  post: {
    title: string
    excerpt: string
    date: string
    url: string
    imageUrl: string
  }
  index: number
}

export function ClientNewsletterCard({ post, index }: NewsletterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <AnimatedBorderCard href={post.url}>
        <Card className="bg-gray-900 border-gray-800 h-full flex flex-col border-transparent">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <FaCalendarAlt className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
          </CardContent>
        </Card>
      </AnimatedBorderCard>
    </motion.div>
  )
}


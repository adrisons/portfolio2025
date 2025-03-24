"use client"

import { Progress } from "@/components/ui/progress"

interface ClientProgressBarProps {
  value: number
  language: string
}

export function ClientProgressBar({ value, language }: ClientProgressBarProps) {
  const getColorClass = (language: string) => {
    switch (language) {
      case "JavaScript":
        return "bg-yellow-500"
      case "TypeScript":
        return "bg-blue-500"
      case "HTML":
        return "bg-orange-500"
      case "CSS":
        return "bg-purple-500"
      default:
        return "bg-green-500"
    }
  }

  return <Progress value={value} className="h-2 bg-gray-800" indicatorClassName={getColorClass(language)} />
}


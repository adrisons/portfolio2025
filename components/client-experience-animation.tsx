"use client"

import { motion } from "framer-motion"

export function ClientExperienceAnimation({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="absolute inset-0 z-0"
    />
  )
}


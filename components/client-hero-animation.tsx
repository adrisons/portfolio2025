"use client"

import { motion } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"

export function ClientHeroAnimation() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      />
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        <FaChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </>
  )
}


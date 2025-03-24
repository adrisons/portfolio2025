"use client"

import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBorderCardProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  gradientClassName?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  borderWidth?: number
  isInteractive?: boolean
}

export function AnimatedBorderCard({
  children,
  className,
  containerClassName,
  gradientClassName,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  onClick,
  borderWidth = 2,
  isInteractive = true,
}: AnimatedBorderCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div
      className={cn("relative h-full rounded-lg overflow-hidden", containerClassName)}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
    >
      {/* Animated gradient border */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg z-0">
          <div
            className={cn(
              "absolute inset-0 rounded-lg animate-border-spin bg-gradient-to-r from-orange-400 via-red-500 to-purple-500",
              gradientClassName,
            )}
          />
          <div
            className="absolute bg-gray-900 rounded-lg"
            style={{
              inset: `${borderWidth}px`,
            }}
          />
        </div>
      )}

      <div
        className={cn(
          "relative z-10 h-full transition-all duration-300",
          isHovered ? "transform scale-[0.99]" : "",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className="block h-full">
        {content}
      </a>
    )
  }

  return content
}


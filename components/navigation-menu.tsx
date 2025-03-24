"use client"

import { useState, useEffect } from "react"
import { FaHome, FaUser, FaBriefcase, FaCode, FaNewspaper, FaEnvelope } from "react-icons/fa"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home", label: "Home", icon: <FaHome className="w-4 h-4" /> },
  { id: "about", label: "About", icon: <FaUser className="w-4 h-4" /> },
  { id: "experience", label: "Experience", icon: <FaBriefcase className="w-4 h-4" /> },
  { id: "skills", label: "Skills", icon: <FaCode className="w-4 h-4" /> },
  { id: "github", label: "GitHub", icon: <FaCode className="w-4 h-4" /> },
  { id: "newsletter", label: "Newsletter", icon: <FaNewspaper className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope className="w-4 h-4" /> },
]

export function NavigationMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      // Show menu when scrolled down more than 100px
      setIsVisible(window.scrollY > 100)

      // Determine active section based on scroll position
      const sections = navItems.map((item) => item.id)

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out bg-gray-900/80 backdrop-blur-md border-b border-gray-800",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center h-16">
          <ul className="flex space-x-1 md:space-x-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "flex items-center px-2 md:px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                  )}
                >
                  <span className="mr-1 md:mr-2">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}


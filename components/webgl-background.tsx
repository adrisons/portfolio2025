"use client"

import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  opacity: number
  speedX: number
  speedY: number
  originalX: number
  originalY: number
}

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 })
  const animationFrameRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize dimensions
    const handleResize = () => {
      if (!canvas) return

      const width = window.innerWidth
      const height = window.innerHeight

      dimensionsRef.current = { width, height }
      canvas.width = width
      canvas.height = height

      // Reinitialize particles
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      const { width, height } = dimensionsRef.current
      const particleCount = Math.min(Math.floor((width * height) / 6000), 300)
      const particles: Particle[] = []

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 3 + 1

        particles.push({
          x,
          y,
          size,
          color: getStarColor(),
          opacity: Math.random() * 0.8 + 0.2,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          originalX: x,
          originalY: y,
        })
      }

      particlesRef.current = particles
    }

    // Generate a random star color
    function getStarColor() {
      const rand = Math.random()
      if (rand < 0.7) {
        // White to blue-ish
        const blue = 200 + Math.floor(Math.random() * 55)
        return `rgb(${blue}, ${blue}, 255)`
      } else if (rand < 0.9) {
        // Yellow-ish
        return `rgb(255, 255, ${150 + Math.floor(Math.random() * 105)})`
      } else {
        // Red-ish
        return `rgb(255, ${100 + Math.floor(Math.random() * 155)}, ${100 + Math.floor(Math.random() * 50)})`
      }
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Animation loop
    const animate = () => {
      const { width, height } = dimensionsRef.current

      // Safety check
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Interactive behavior when near mouse
        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius

          // Push particles away from mouse
          particle.x -= Math.cos(angle) * force * 2
          particle.y -= Math.sin(angle) * force * 2
        } else {
          // Gradually return to original position when not influenced by mouse
          particle.x += (particle.originalX - particle.x) * 0.02
          particle.y += (particle.originalY - particle.y) * 0.02
        }

        // Add some random movement
        particle.x += particle.speedX * 0.2
        particle.y += particle.speedY * 0.2

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
      })

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(120, 100, 255, 0.1)"
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 1

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initial setup
    setTimeout(() => {
      handleResize()
      window.addEventListener("resize", handleResize)
      window.addEventListener("mousemove", handleMouseMove)

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate)
    }, 0)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" style={{ pointerEvents: "none" }} />
}


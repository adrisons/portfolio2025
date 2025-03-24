import { config } from "@/lib/config"
import { ClientHeroAnimation } from "./client-hero-animation"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center container mx-auto px-4">
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="block">{config.name}</span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {config.title}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mt-6">{config.description}</p>
      </div>
      <ClientHeroAnimation />
    </section>
  )
}


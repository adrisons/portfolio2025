import Head from "next/head";
import { Suspense } from "react";
import { config } from "@/lib/config";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { WebGLBackground } from "@/components/webgl-background";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Experience } from "@/components/experience";
import { Newsletter } from "@/components/newsletter";
import { GitHubSection } from "@/components/github-section";
import { NavigationMenu } from "@/components/navigation-menu";

export default function HomePage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main className="relative min-h-screen bg-black text-white">
        <NavigationMenu />
        <WebGLBackground />

        <div id="home" className="relative z-10">
          <Hero />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Suspense fallback={<LoadingSkeleton type="about" />}>
            <section id="about" className="py-16">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                {config.about.title}
              </h2>
              {config.about.description.map((paragraph, index) => (
                <p key={index} className="text-lg max-w-3xl mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          </Suspense>

          <hr className="border-gray-800 my-8" />

          <Suspense fallback={<LoadingSkeleton type="experience" />}>
            <Experience />
          </Suspense>

          <hr className="border-gray-800 my-8" />

          <Suspense fallback={<LoadingSkeleton type="skills" />}>
            <Skills />
          </Suspense>

          <hr className="border-gray-800 my-8" />

          <Suspense fallback={<LoadingSkeleton type="newsletter" />}>
            <Newsletter />
          </Suspense>

          <hr className="border-gray-800 my-8" />

          <Suspense fallback={<LoadingSkeleton type="github" />}>
            <GitHubSection username={config.githubUsername} />
          </Suspense>

          <hr className="border-gray-800 my-8" />

          <Suspense fallback={<LoadingSkeleton type="contact" />}>
            <Contact />
          </Suspense>
        </div>
      </main>
    </>
  );
}

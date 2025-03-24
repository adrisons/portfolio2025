import { config } from "@/lib/config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { SiBluesky } from "react-icons/si"

export function Contact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
        Connect With Me
      </h2>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Find me on these platforms</CardTitle>
          <CardDescription>Connect with me on social media and professional networks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={config.contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="w-5 h-5 mr-3" />
              <span>github.com/{config.githubUsername}</span>
            </a>

            <a
              href={config.contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 mr-3 text-blue-500" />
              <span>{config.contactInfo.linkedin.replace("https://", "")}</span>
            </a>

            <a
              href={config.contactInfo.bluesky}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <SiBluesky className="w-5 h-5 mr-3 text-blue-400" />
              <span>adpegu.bsky.social</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}


import { config } from "@/lib/config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClientExperienceAnimation } from "./client-experience-animation"
import { FaCalendarAlt, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa"

export function Experience() {
  // Get only the 3 most recent experiences
  const recentExperiences = config.experiences.slice(0, 3)

  return (
    <section id="experience" className="py-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
        Work Experience
      </h2>

      <div className="space-y-6">
        {recentExperiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            <ClientExperienceAnimation index={index} />
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-300">{exp.company}</CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-gray-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-700">
            <a
              href={config.contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaLinkedin className="w-4 h-4 text-blue-500" />
              View Full Work History on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}


import { config } from "@/lib/config";
import { fetchRssFeed } from "@/lib/rss";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ClientNewsletterCard } from "./client-newsletter-card";
import { NewsletterEmbed } from "./client-newsletter-embed"; // Updated import

export async function Newsletter() {
  const { posts, description } = await fetchRssFeed(
    config.rss.rssFeedUrl,
    config.rss.placeholderImage
  ).catch(() => {
    // Fallback to placeholder posts if RSS feed fails
    return {
      posts: [
        {
          id: "1",
          title: "Could no",
          excerpt:
            "Learn how to create inclusive web experiences that work for everyone, with practical tips and code examples.",
          date: "January 20, 2023",
          url: config.rss.visitLink,
          imageUrl: config.rss.placeholderImage,
        },
      ],
      description: "Default newsletter description.",
    };
  });

  return (
    <section id="newsletter" className="py-16">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 text-transparent bg-clip-text">
        {config.rss.newsletterTitle}
      </h2>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-lg mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ClientNewsletterCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </div>
      
      <NewsletterEmbed />

      <div className="flex justify-center mt-12">
        <Button
          asChild
          variant="outline"
          className="border-gray-700 hover:bg-gray-900"
        >
          <a
            href={config.rss.visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Visit {config.rss.newsletterTitle} on Substack
          </a>
        </Button>
      </div>
    </section>
  );
}

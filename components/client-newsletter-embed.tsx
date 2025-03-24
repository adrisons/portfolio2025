"use client"

import { useEffect, useRef } from "react"
import { config } from "@/lib/config";
import { useIsMobile } from "@/hooks/use-mobile";

interface SubstackEmbedProps {
  url: string
  width?: number
  height?: number
}

export function SubstackEmbed({ url, width = 480, height = 320 }: SubstackEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      const handleIframeLoad = () => {
        iframe.style.opacity = "1"
      }

      iframe.addEventListener("load", handleIframeLoad)
      return () => iframe.removeEventListener("load", handleIframeLoad)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={url}
      width={width}
      height={height}
      style={{
        border: "1px solid #333",
        background: "white",
        borderRadius: "8px",
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      frameBorder="0"
      scrolling="no"
      title="Newsletter subscription"
      className="mx-auto w-full max-w-md"
    />
  )
}

export function NewsletterEmbed() {
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col gap-6 ${isMobile ? "" : "lg:flex-row"}`}>
      <div className={`${isMobile ? "" : "lg:w-1/2"}`}>
        <SubstackEmbed url={config.rss.subscribeEmbedUrl} />
      </div>

      <div
        className={`${
          isMobile ? "" : "lg:w-1/2"
        } bg-gray-900 border border-gray-800 rounded-lg p-6`}
      >
        <h3 className="font-medium mb-2">Why Subscribe?</h3>
        <ul className="space-y-2 text-gray-300">
          {config.rss.whySubscribe.map((reason, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


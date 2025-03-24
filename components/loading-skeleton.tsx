import { Skeleton } from "@/components/ui/skeleton"

interface LoadingSkeletonProps {
  type: "about" | "github" | "projects" | "skills" | "contact" | "experience" | "newsletter"
}

export function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  switch (type) {
    case "about":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-24 w-full max-w-3xl" />
        </section>
      )

    case "github":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64" />
            <div className="lg:col-span-2">
              <Skeleton className="h-10 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )

    case "skills":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-10 w-full mb-8" />
          <Skeleton className="h-64 w-full" />
        </section>
      )

    case "contact":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-48" />
        </section>
      )

    case "experience":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </section>
      )

    case "newsletter":
      return (
        <section className="py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-24 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            </div>
            <Skeleton className="h-96" />
          </div>
        </section>
      )

    default:
      return <Skeleton className="h-32 w-full" />
  }
}


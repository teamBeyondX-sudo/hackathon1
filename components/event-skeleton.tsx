import { Skeleton } from "@/components/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden glassmorphism">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

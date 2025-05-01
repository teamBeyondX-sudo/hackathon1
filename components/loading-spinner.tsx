export function LoadingSpinner({
  size = "medium",
  className = "",
}: { size?: "small" | "medium" | "large"; className?: string }) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className={`loader ${sizeClasses[size]}`} aria-label="Loading"></span>
    </div>
  )
}

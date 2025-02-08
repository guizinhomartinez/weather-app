"use client"

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-lg z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
} 
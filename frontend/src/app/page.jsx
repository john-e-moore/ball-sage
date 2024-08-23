"use client"

import SearchBar from "@/components/ui/search-bar"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center pt-80">
        <SearchBar />
      </main>
    </div>
  )
}
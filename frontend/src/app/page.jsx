"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      const searchResults = data["search-results"]
      router.push(`/search-results?results=${encodeURIComponent(JSON.stringify(searchResults))}`)
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-transparent">
        <Link href="/" className="text-lg font-bold">
          Football Sage
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline">
            Docs
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-white px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              ) : (
                <SearchIcon className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </main>
      <footer className="w-full bg-transparent px-4 py-3 text-sm text-gray-500 flex items-center justify-center">
        <CopyrightIcon className="h-4 w-4 mr-2" />
        <span>2024 Trade Secrets Data LLC</span>
      </footer>
    </div>
  )
}

function CopyrightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
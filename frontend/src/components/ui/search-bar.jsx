import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchBar({ initialSearchTerm = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      const searchResults = data["search-results"]
      router.push(`/search-results?query=${encodeURIComponent(searchTerm)}&results=${encodeURIComponent(JSON.stringify(searchResults))}`)
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-full bg-white px-5 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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
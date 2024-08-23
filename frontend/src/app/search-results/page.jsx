"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/ui/search-bar'
import { Result } from '@/components/ui/result'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const resultsParam = searchParams.get('results')
  const queryParam = searchParams.get('query')
  const results = resultsParam ? JSON.parse(decodeURIComponent(resultsParam)) : []
  const [searchTerm, setSearchTerm] = useState(queryParam || '')

  useEffect(() => {
    setSearchTerm(queryParam || '')
  }, [queryParam])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center pt-60">
        <SearchBar initialSearchTerm={searchTerm} />
        <Result result={results} />
        <Link href="/" className="mt-8 inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition duration-300">
          Back to Search
        </Link>
      </main>
    </div>
  )
}
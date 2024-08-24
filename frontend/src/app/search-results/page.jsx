"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/ui/search-bar'
import Table from '@/components/ui/table'
import ShowSQL from '@/components/ui/show-sql'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const resultsParam = searchParams.get('results')
  const queryParam = searchParams.get('query')
  const sqlParam = searchParams.get('sql')
  const results = resultsParam ? JSON.parse(decodeURIComponent(resultsParam)) : []
  const [searchTerm, setSearchTerm] = useState(queryParam || '')

  useEffect(() => {
    setSearchTerm(queryParam || '')
  }, [queryParam])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center pt-60">
        <SearchBar initialSearchTerm={searchTerm} />
        <div className="mt-8">
          <Table data={results} />
        </div>
        <div className="mt-8">
          {sqlParam && <ShowSQL sql={decodeURIComponent(sqlParam)} />}
        </div>
      </main>
    </div>
  )
}
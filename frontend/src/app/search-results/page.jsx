"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const resultsParam = searchParams.get('results')
  const results = resultsParam ? JSON.parse(decodeURIComponent(resultsParam)) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold">{result.query}</h2>
              <p className="mt-2">{result.response}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      <Link href="/" className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Back to Search
      </Link>
    </div>
  )
}
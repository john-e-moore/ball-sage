/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QsQvqsiLMQa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-transparent">
        <Link href="#" className="text-lg font-bold" prefetch={false}>
          Football Sage
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Docs
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start pt-80">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Ask a question..."
            className="w-full rounded-full bg-white px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-5">
            <SearchIcon className="h-5 w-5 text-gray-400" />
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
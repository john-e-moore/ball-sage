/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lBjSBgj3RJf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-transparent">
        <div className="text-lg font-bold">Football Sage</div>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Docs
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="relative w-full max-w-lg">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-white px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-5">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </main>
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
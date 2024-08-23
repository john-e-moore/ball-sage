// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { DM_Sans } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import Link from "next/link"
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const fontHeading = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400'
})

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
  );
}

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={cn('antialiased', fontHeading.variable, fontBody.variable)}>
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
        {children}
        <footer className="w-full bg-transparent px-4 py-3 text-sm text-gray-500 flex items-center justify-center">
          <CopyrightIcon className="h-4 w-4 mr-2" />
          <span>2024 Trade Secrets Data LLC</span>
        </footer>
      </body>
    </html>
  );
}
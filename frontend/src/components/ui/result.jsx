import * as React from "react"
import { cn } from "@/lib/utils"

const Result = React.forwardRef(({ className, result, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      ref={ref}
      {...props}
    >
      {result.length > 0 ? (
        <ul className="space-y-6">
          {result.map((result, index) => (
            <li key={index} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">{result.query}</h2>
              <p className="mt-2 text-gray-600">{result.response}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No result found.</p>
      )}
    </div>
  );
})
Result.displayName = "result"

export { Result }

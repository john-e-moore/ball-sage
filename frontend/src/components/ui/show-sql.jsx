import React, { useState } from 'react'

export default function ShowSQL({ sql }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide SQL' : 'Show SQL'}
      </button>
      {isVisible && (
        <pre className="mt-2 p-2 bg-gray-100 border rounded">
          {sql}
        </pre>
      )}
    </div>
  )
}
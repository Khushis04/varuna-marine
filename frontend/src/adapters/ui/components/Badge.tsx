import React from 'react'
export const Badge: React.FC<{ color?: 'green' | 'red' | 'gray'; children: React.ReactNode }> = ({
  color = 'gray',
  children,
}) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs font-medium ${color === 'green' ? 'bg-green-100 text-green-700' : color === 'red' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
  >
    {children}
  </span>
)

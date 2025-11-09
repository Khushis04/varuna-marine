import React from 'react'
export const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-3 rounded border border-red-300 bg-red-50 text-red-700 text-sm">{message}</div>
)

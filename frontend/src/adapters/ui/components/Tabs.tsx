import React from 'react'

export const Tabs: React.FC<{
  tabs: { key: string; label: string; content: React.ReactNode }[]
}> = ({ tabs }) => {
  const [active, setActive] = React.useState(tabs[0].key)
  const current = tabs.find((t) => t.key === active)

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 rounded-md border ${
              active === t.key ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>{current?.content}</div>
    </div>
  )
}

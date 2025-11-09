import React from 'react'
import { Tabs } from './components/Tabs'
import RoutesTab from './pages/RoutesTab'
import CompareTab from './pages/CompareTab'
import BankingTab from './pages/BankingTab'
import PoolingTab from './pages/PoolingTab'


export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Fuel EU Maritime Compliance Dashboard</h1>
      
      <Tabs
        tabs={[
          { key: 'routes', label: 'Routes', content: <RoutesTab /> },
          { key: 'compare', label: 'Compare', content: <CompareTab /> },
          { key: 'banking', label: 'Banking', content: <BankingTab /> },
          { key: 'pooling', label: 'Pooling', content: <PoolingTab /> }
        ]}
      />
    </div>
  )
}

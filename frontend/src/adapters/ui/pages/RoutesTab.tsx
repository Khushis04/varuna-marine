import React from 'react'
import { RoutesAPI } from '@infra/ApiClient'
import type { Route } from '@core/domain/Route'
import { DataTable } from '../components/DataTable'
import { ErrorBanner } from '../components/ErrorBanner'


export default function RoutesTab() {
  const [rows, setRows] = React.useState<Route[]>([])
  const [error, setError] = React.useState<string>('')
  const [filters, setFilters] = React.useState<{ vesselType?: string; fuelType?: string; year?: string }>({})

import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pg = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fuel_eu'
})

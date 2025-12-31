/**
 * Script to clear all locked documents from the database
 * This fixes the SQL query error caused by malformed queries in Payload's document locking feature
 *
 * Run with: pnpm tsx src/scripts/clear-locked-documents-execute.ts
 */

import 'dotenv/config'
import { Client } from 'pg'

async function clearLockedDocuments() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set')
    console.error(
      '💡 Please set DATABASE_URL in your .env file or export it before running this script',
    )
    process.exit(1)
  }

  const client = new Client({
    connectionString: databaseUrl,
  })

  try {
    await client.connect()
    console.log('✅ Connected to database')

    // Delete all locked documents
    const result = await client.query('DELETE FROM payload_locked_documents')

    console.log(`✅ Cleared ${result.rowCount} locked document(s) from the database`)

    // Verify the table is empty
    const countResult = await client.query('SELECT COUNT(*) FROM payload_locked_documents')
    const remainingCount = parseInt(countResult.rows[0].count, 10)

    if (remainingCount === 0) {
      console.log('✅ Verified: No locked documents remaining')
    } else {
      console.log(`⚠️  Warning: ${remainingCount} locked document(s) still remain`)
    }
  } catch (error) {
    console.error('❌ Error clearing locked documents:', error)
    if (error instanceof Error) {
      console.error('   Error message:', error.message)
    }
    process.exit(1)
  } finally {
    await client.end()
    console.log('✅ Database connection closed')
  }

  process.exit(0)
}

clearLockedDocuments()

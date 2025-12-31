/**
 * Script to clear all locked documents from the database
 * This fixes the SQL query error caused by malformed queries in Payload's document locking feature
 * 
 * Run with: pnpm tsx src/scripts/clear-locked-documents.ts
 * 
 * Alternative: Run this SQL directly in your database:
 * DELETE FROM payload_locked_documents;
 */

import { getPayload } from 'payload'
import config from '../payload.config'

async function clearLockedDocuments() {
  try {
    const payload = await getPayload({ config })

    // Use raw database query to bypass Payload's query builder bug
    const db = payload.db
    
    // For PostgreSQL, use the raw query method
    if ('query' in db && typeof db.query === 'function') {
      await db.query('DELETE FROM payload_locked_documents')
      console.log('✅ Cleared all locked documents using raw SQL query')
    } else {
      // Fallback: try to use Payload's delete (may fail due to the bug)
      try {
        const result = await payload.delete({
          collection: 'payload-locked-documents',
          where: {},
        })
        console.log(`✅ Cleared ${result.totalDocs} locked document(s)`)
      } catch (deleteError) {
        console.error('❌ Payload delete failed (expected due to bug).')
        console.error('💡 Please run this SQL directly in your database:')
        console.error('   DELETE FROM payload_locked_documents;')
        throw deleteError
      }
    }
  } catch (error) {
    console.error('❌ Error clearing locked documents:', error)
    console.error('\n💡 Alternative: Run this SQL directly in your PostgreSQL database:')
    console.error('   DELETE FROM payload_locked_documents;')
    process.exit(1)
  }

  process.exit(0)
}

clearLockedDocuments()


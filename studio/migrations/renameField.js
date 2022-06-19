// ref: https://www.sanity.io/schemas/rename-a-field-across-documents-5cd6f5f0
// use: rename oldName to newName in documentType
// cmd: sanity exec migrations/renameField.js --with-user-token sk7Bv4Ib1VoMxkvVCHkhFYXtH4zTppDybb5hRPc4PBLIySjMBgckzgrXzsvVeFXeCjyaaV0MPvMGljjIGHZW6BbWNENCxPlh294Z2LZDZPXzxdwUir5FVYvMmrApbIbJdNNhna4RZYxmRqzdYS8A8JbC2nYkOnHRhfwsjPec1xjzhOiLIZT8
/* eslint-disable no-console */
import client from 'part:@sanity/base/client'

const documentType = 'collection';
const oldName = 'subCollection';
const newName = 'subCollections';

const fetchDocuments = () =>
  client.fetch(`*[_type == '${documentType}' && defined(${oldName})][0...100] {_id, _rev, ${oldName}}`)

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {[newName]: doc[oldName]},
      unset: [oldName],
      // this will cause the migration to fail if any of the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})
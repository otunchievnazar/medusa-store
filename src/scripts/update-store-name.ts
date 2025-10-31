import { ExecArgs } from "@medusajs/framework/types"

/**
 * Script to update the store name
 * 
 * Usage:
 * npx medusa exec ./src/scripts/update-store-name.ts
 */
export default async function updateStoreName({
  container
}: ExecArgs) {
  const storeModuleService = container.resolve("store")

  // Get the current store
  const stores = await storeModuleService.listStores()
  
  if (!stores || stores.length === 0) {
    console.log("No store found!")
    return
  }

  const store = stores[0]
  console.log(`Current store name: "${store.name}"`)

  // Update the store name
  const newStoreName = "My Awesome Store" // ⬅️ CHANGE THIS to your desired name
  
  const updatedStore = await storeModuleService.updateStores(store.id, {
    name: newStoreName
  })

  console.log(`✅ Store name updated to: "${updatedStore.name}"`)
}


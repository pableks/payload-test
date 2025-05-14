import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Seo } from '@/payload-types' // Import 'Seo' directly

export const getSEOData = async (): Promise<Seo> => {
  // Use 'Seo' as the return type
  const seoData = (await getCachedGlobal('seo')()) as Seo // Call the function and cast to 'Seo'
  return seoData
}

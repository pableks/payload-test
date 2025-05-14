import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateSEO: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    const urls = ['/', '/posts', '/search']

    // Revalidate the main paths where SEO is most critical
    for (const url of urls) {
      revalidatePath(url)
    }

    req.payload.logger.info(`✅ Successfully revalidated SEO for ${urls.join(', ')}`)
  } catch (err: unknown) {
    req.payload.logger.error(`Error revalidating SEO: ${err}`)
  }
}

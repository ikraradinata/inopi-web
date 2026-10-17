/** Bahasa pengirim formulir, dibaca dari body permintaan (default Indonesia). */
export const senderLocale = (body: Record<string, unknown>): 'id' | 'en' => (body.locale === 'en' ? 'en' : 'id')

export const LANGUAGE_LABEL = { id: 'Indonesia', en: 'English' } as const

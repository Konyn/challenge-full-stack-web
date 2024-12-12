import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const courseValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
    name: vine.string().minLength(2),
    description: vine.string().optional(),
    image: vine.string().optional(),
    slug: vine.string().unique(async (db, value) => {
      const match = await db.from('courses').select('id').where('slug', value).first()
      return !match
    }),
  })
)
courseValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nome inválido',
  'name.minLength': 'Nome deve ter no mínimo 2 caracteres',
  'slug.unique': 'Slug ja cadastrado',
})

import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const userMatch = await db.from('users').select('id').where('email', value).first()
        if (userMatch) {
          return false
        }
        const studentMatch = await db.from('students').select('id').where('email', value).first()
        return !studentMatch
      }),
    password: vine.string().minLength(8),
  })
)
userValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nome inválido',
  'name.minLength': 'Nome deve ter no mínimo 2 caracteres',
  'email.required': 'Email inválido',
  'email.database.unique': 'Email já cadastrado',
  'password.required': 'Senha inválida',
  'password.minLength': 'Senha deve ter no mínimo 8 caracteres',
})

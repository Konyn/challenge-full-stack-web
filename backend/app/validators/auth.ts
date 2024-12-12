import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const password = vine.string().minLength(8)
export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Email inválido',
  'password.minLength': 'Senha deve ter no mínimo 8 caracteres',
})

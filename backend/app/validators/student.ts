import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const studentValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('students').select('id').where('email', value).first()
        return !match
      }),
    ra: vine
      .number()
      .min(1000000)
      .max(9999999)
      .positive()
      .unique(async (db, value) => {
        const match = await db.from('students').select('id').where('ra', value).first()
        return !match
      }),
    cpf: vine
      .string()
      .minLength(11)
      .maxLength(11)
      .unique(async (db, value) => {
        const match = await db.from('students').select('id').where('cpf', value).first()
        return !match
      }),
  })
)

studentValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nome é obrigatório',
  'name.minLength': 'Nome deve ter no mínimo 2 caracteres',
  'email': 'Email inválido',
  'email.required': 'Email é obrigatório',
  'email.database.unique': 'Email já cadastrado',
  'ra.required': 'RA é obrigatório',
  'ra.database.unique': 'RA já cadastrado',
  'ra.min': 'RA deve ter 7 dígitos',
  'ra.max': 'RA deve ter 7 dígitos',
  'cpf.required': 'CPF é obrigatório',
  'cpf.database.unique': 'CPF já cadastrado',
  'cpf.maxLength': 'CPF deve ter 11 dígitos',
})

export const editStudentValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('students').select('id').where('email', value).first()
        return !match
      }),
  })
)

editStudentValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'Nome é obrigatório',
  'name.minLength': 'Nome deve ter no mínimo 2 caracteres',
  'email': 'Email inválido',
  'email.required': 'Email é obrigatório',
  'email.database.unique': 'Email já cadastrado',
})

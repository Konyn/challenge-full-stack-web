import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const studentCourseValidator = vine.compile(
  vine.object({
    studentId: vine.number().positive(),
    courseId: vine.number().positive(),
  })
)

studentCourseValidator.messagesProvider = new SimpleMessagesProvider({
  'studentId.positive': 'Estudante inválido',
  'courseId.positive': 'Curso inválido',
  'studentId.required': 'Estudante é obrigatório',
  'courseId.required': 'Curso é obrigatório',
  'studentId.number': 'Estudante deve ser do tipo number',
  'courseId.number': 'Curso deve ser do tipo number',
})

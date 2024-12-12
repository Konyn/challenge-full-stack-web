import CoursesStudent from '#models/courses_student'
import Student from '#models/student'
import { test } from '@japa/runner'
import Sinon from 'sinon'
import AddStudantCourseAction from '../../../app/actions/student_course/add_studant_course.js'

test.group('AddStudantCourseAction', (group) => {
  let queryCourseStub: Sinon.SinonStub
  let queryStudentStub: Sinon.SinonStub
  let createStub: Sinon.SinonStub
  let action: AddStudantCourseAction

  group.each.setup(() => {
    // Stubs para as consultas de validação
    queryCourseStub = Sinon.stub(CoursesStudent, 'query').returns({
      where: Sinon.stub().returnsThis(),
      first: Sinon.stub().resolves({ id: 1, name: 'Logica de programação' }),
    } as any)

    queryStudentStub = Sinon.stub(Student, 'query').returns({
      where: Sinon.stub().returnsThis(),
      first: Sinon.stub().resolves({ id: 1, name: 'John', email: 'john@test.com' }),
    } as any)

    // Stub para a criação de relacionamento
    createStub = Sinon.stub(CoursesStudent, 'create').resolves({ courseId: 1, studentId: 1 })

    action = new AddStudantCourseAction()
  })

  group.each.teardown(() => {
    Sinon.restore()
  })

  test('Added student to course', async ({ assert }) => {
    const mockCourseStudent = { courseId: 1, studentId: 1 }
    const result = await action.execute(mockCourseStudent)

    assert.deepEqual(result, { courseId: 1, studentId: 1 })
    assert.isTrue(createStub.calledOnce)
  })

  test('should throw error if course not found', async ({ assert }) => {
    queryCourseStub.returns({
      where: Sinon.stub().returnsThis(),
      first: Sinon.stub().resolves(null),
    } as any)

    await assert.rejects(
      async () => {
        await action.execute({ courseId: 1, studentId: 1 })
      },
      Error,
      'Dados do curso ou estudante não encontrado'
    )
  })

  test('should throw error if student not found', async ({ assert }) => {
    queryStudentStub.returns({
      where: Sinon.stub().returnsThis(),
      first: Sinon.stub().resolves(null),
    } as any)

    await assert.rejects(
      async () => {
        await action.execute({ courseId: 1, studentId: 1 })
      },
      Error,
      'Dados do curso ou estudante não encontrado'
    )
  })
})

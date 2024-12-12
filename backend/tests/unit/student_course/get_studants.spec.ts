import { test } from '@japa/runner'
import Sinon from 'sinon'
import GetStudantsCourseAction from '../../../app/actions/student_course/get_studants_course.js'
import Course from '#models/course'
import CoursesStudent from '#models/courses_student'
import Student from '#models/student'

test.group('Student course get studants', (group) => {
  let action: GetStudantsCourseAction
  let findOrFailCourseStudentStub: Sinon.SinonStub
  let findOrFailCourseStub: Sinon.SinonStub
  let findOrFailStudentStub: Sinon.SinonStub

  group.each.setup(() => {
    findOrFailCourseStudentStub = Sinon.stub(CoursesStudent, 'findOrFail')
    findOrFailCourseStub = Sinon.stub(Course, 'findOrFail')
    findOrFailStudentStub = Sinon.stub(Student, 'findOrFail')
    action = new GetStudantsCourseAction()
  })

  group.each.teardown(() => {
    Sinon.restore()
  })

  test('should return course and student if data is valid', async ({ assert }) => {
    const mockCourseStudent = { id: 1, courseId: 1, studentId: 1 }
    const mockCourse = { id: 1, name: 'Logic Programming' }
    const mockStudent = { id: 1, name: 'John Doe', email: 'john@test.com' }

    findOrFailCourseStudentStub.resolves(mockCourseStudent)
    findOrFailCourseStub.resolves(mockCourse)
    findOrFailStudentStub.resolves(mockStudent)

    const result = await action.execute(mockCourseStudent.id)

    assert.deepEqual(result, { course: mockCourse, student: mockStudent })
    assert.isTrue(findOrFailCourseStudentStub.calledOnceWith(mockCourseStudent.id))
    assert.isTrue(findOrFailCourseStub.calledOnceWith(mockCourseStudent.courseId))
    assert.isTrue(findOrFailStudentStub.calledOnceWith(mockCourseStudent.studentId))
  })

  test('should throw error if course student data not found', async ({ assert }) => {
    findOrFailCourseStudentStub.rejects(new Error('Dados do curso não encontrado'))

    await assert.rejects(
      async () => {
        await action.execute(1)
      },
      Error,
      'Dados do curso não encontrado'
    )
    assert.isTrue(findOrFailCourseStudentStub.calledOnceWith(1))
    assert.isFalse(findOrFailCourseStub.called)
    assert.isFalse(findOrFailStudentStub.called)
  })

  test('should throw error if course not found', async ({ assert }) => {
    const mockCourseStudent = { id: 1, courseId: 1, studentId: 1 }
    findOrFailCourseStudentStub.resolves(mockCourseStudent)
    findOrFailCourseStub.rejects(new Error('Course not found'))

    await assert.rejects(
      async () => {
        await action.execute(1)
      },
      Error,
      'Course not found'
    )
    assert.isTrue(findOrFailCourseStudentStub.calledOnceWith(1))
    assert.isTrue(findOrFailCourseStub.calledOnceWith(mockCourseStudent.courseId))
    assert.isFalse(findOrFailStudentStub.called)
  })

  test('should throw error if student not found', async ({ assert }) => {
    const mockCourseStudent = { id: 1, courseId: 1, studentId: 1 }
    const mockCourse = { id: 1, name: 'Logic Programming' }
    findOrFailCourseStudentStub.resolves(mockCourseStudent)
    findOrFailCourseStub.resolves(mockCourse)
    findOrFailStudentStub.rejects(new Error('Student not found'))

    await assert.rejects(
      async () => {
        await action.execute(1)
      },
      Error,
      'Student not found'
    )
    assert.isTrue(findOrFailCourseStudentStub.calledOnceWith(1))
    assert.isTrue(findOrFailCourseStub.calledOnceWith(mockCourseStudent.courseId))
    assert.isTrue(findOrFailStudentStub.calledOnceWith(mockCourseStudent.studentId))
  })
})

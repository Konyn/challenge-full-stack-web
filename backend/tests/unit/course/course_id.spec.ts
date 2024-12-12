import { test } from '@japa/runner'
import Course from '#models/course'
import sinon from 'sinon'
import CourseByIdAction from '../../../app/actions/course/course_by_id.js'

test.group('GetCoursesAction.execute', (group) => {
  let findOrFailStub: sinon.SinonStub
  let action: CourseByIdAction

  group.each.setup(() => {
    findOrFailStub = sinon.stub(Course, 'findOrFail')
    action = new CourseByIdAction()
  })
  group.each.teardown(() => {
    findOrFailStub.restore()
  })
  test('Course by id', async ({ assert }) => {
    const mokeCurse = { id: 1, name: 'Logica de programação', slug: 'logica' }
    findOrFailStub.resolves(mokeCurse)
    const result = await action.execute(mokeCurse.id)
    assert.deepEqual(result, mokeCurse)
    assert.isTrue(findOrFailStub.calledOnce)
  })
})

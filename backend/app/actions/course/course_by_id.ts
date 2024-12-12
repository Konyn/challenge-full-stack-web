import Course from '#models/course'

export default class CourseByIdAction {
  public async execute(id: number) {
    const course = await Course.findOrFail(id)
    return course
  }
}

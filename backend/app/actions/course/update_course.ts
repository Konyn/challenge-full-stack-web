import Course from '#models/course'
import CourseDto from '../../dtos/course_dto.js'

export default class UpdateCourseAction {
  public async execute(id: number, data: CourseDto) {
    const course = await Course.findOrFail(id)
    course.merge(data)
    return course.save()
  }
}

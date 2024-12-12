import Course from '#models/course'
import CourseDto from '../../dtos/course_dto.js'

export default class CreateCourseAction {
  public async execute(course: CourseDto) {
    return await Course.create(course)
  }
}

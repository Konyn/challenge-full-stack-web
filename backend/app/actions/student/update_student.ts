import Studant from '#models/student'
import StudantDto from '../../dtos/student_dto.js'

export default class UpdateStudentAction {
  async execute(studant: Studant, studantData: StudantDto) {
    return this.update(studant, studantData)
  }
  async update(studant: Studant, studantData: StudantDto) {
    studant.merge({
      name: studantData.name,
      email: studantData.email,
    })
    await studant.save()
    return studant
  }
}

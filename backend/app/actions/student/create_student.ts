import Studant from '#models/student'
import StudantDto from '../../dtos/student_dto.js'

export default class CreateStudentAction {
  public async execute(data: StudantDto) {
    const validate = await this.validateStudant(data)
    if (validate) {
      return validate
    }
    return this.create(data)
  }
  private async create(studantData: StudantDto) {
    return await Studant.create(studantData)
  }

  private async validateStudant(studantData: StudantDto) {
    const studant = await Studant.findBy('email', studantData.email)
    if (studant) {
      return 'Email já cadastrado'
    }
    return false
  }
}

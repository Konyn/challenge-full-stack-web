import User from '#models/user'
import UserDto from '../../dtos/user_dto.js'

export default class CreateUserAction {
  public async execute(data: UserDto) {
    return this.create(data)
  }

  private async create(userData: UserDto) {
    const user = await User.create(userData)
    return user
  }
}

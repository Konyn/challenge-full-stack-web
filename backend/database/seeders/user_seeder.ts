import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()
    try {
      const user = new User()
      user.useTransaction(trx)
      await User.create({
        name: 'Admin',
        email: 'admin1@teste.com',
        password: 'admin1234',
      })
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}

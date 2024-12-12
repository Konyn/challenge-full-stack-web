import Course from '#models/course'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()
    const course = new Course()
    try {
      course.useTransaction(trx)
      await Course.createMany([
        {
          name: 'Matemática',
          description: 'Curso de matemática',
          image: 'https://i.ibb.co/6KvzD1r/curso-matematica.jpg',
        },
        {
          name: 'Português',
          description: 'Curso de português',
          image: 'https://i.ibb.co/6KvzD1r/curso-matematica.jpg',
        },
        {
          name: 'Geografia',
          description: 'Curso de Geografia',
          image: 'https://i.ibb.co/6KvzD1r/curso-matematica.jpg',
        },
      ])
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}

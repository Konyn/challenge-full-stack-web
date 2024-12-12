import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UserController = () => import('#controllers/user_controller')
const StudentsController = () => import('#controllers/students_controller')
const AuthController = () => import('#controllers/auth_controller')

router.post('login', [AuthController, 'login'])
router.post('logout', [AuthController, 'logout']).use(middleware.auth())
router.post('register', [UserController, 'register'])

router
  .group(() => {
    router.get('me', [AuthController, 'me'])
    router.get('student/list', [StudentsController, 'index'])
    router.get('student/:id', [StudentsController, 'show'])
    router.post('student/create', [StudentsController, 'create'])
    router.patch('student/:id/edit', [StudentsController, 'update'])
    router.delete('student/:id', [StudentsController, 'destroy'])
  })
  .use(middleware.auth())
  .prefix('admin')

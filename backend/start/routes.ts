import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UserController = () => import('#controllers/user_controller')
const StudentsController = () => import('#controllers/students_controller')
const AuthController = () => import('#controllers/auth_controller')
const CoursesController = () => import('#controllers/courses_controller')
const StudentsCoursesController = () => import('#controllers/students_courses_controller')

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

    router.get('course/list', [CoursesController, 'index'])
    router.get('course/:id', [CoursesController, 'show'])
    router.post('course/create', [CoursesController, 'create'])
    router.patch('course/:id/edit', [CoursesController, 'update'])
    router.delete('course/:id', [CoursesController, 'destroy'])

    router.post('course/add-student', [StudentsCoursesController, 'addStudent'])
    router.get('course/:id/student/list', [StudentsCoursesController, 'getStudentsCourse'])
  })
  .use(middleware.auth())
  .prefix('admin')

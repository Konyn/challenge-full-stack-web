import router from '@adonisjs/core/services/router'
const UserController = () => import('#controllers/user_controller')

router.post('register', [UserController, 'register'])

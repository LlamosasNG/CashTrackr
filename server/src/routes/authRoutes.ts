import { limiter } from '@/config/limiter'
import { AuthController } from '@/controllers/AuthController'
import { authenticate } from '@/middleware/auth'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { body, param } from 'express-validator'

const router: Router = Router()

router.use(limiter)
router.post(
  '/create-account',
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña es muy corta, mínimo son 8 caracteres '),
  body('email').isEmail().withMessage('Email no válido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no válido'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  body('email').isEmail().withMessage('Email no válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Email no válido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no válido'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  param('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña es muy corta, mínimo son 8 caracteres '),
  handleInputErrors,
  AuthController.resetPassword
)

router.get('/user', authenticate, AuthController.user)
export default router

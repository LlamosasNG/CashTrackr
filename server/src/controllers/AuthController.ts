import { AuthEmail } from '@/emails/AuthEmail'
import User from '@/models/User'
import { checkPassword, hashPassword } from '@/utils/auth'
import { generateJWT } from '@/utils/jwt'
import { generateToken } from '@/utils/token'
import { Request, Response } from 'express'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    // Prevenir usuarios duplicados
    const userExist = await User.findOne({ where: { email } })
    if (userExist) {
      const error = new Error(
        'Un usuario ya esta registrado con el mismo email'
      )
      res.status(409).json({ error: error.message })
      return
    }
    try {
      const user = new User(req.body)
      user.token = generateToken()
      user.password = await hashPassword(password)
      await user.save()
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      res.send('Cuenta creada correctamente, revisa tu email para confirmarla')
    } catch (error) {
      res.status(500).send('Hubo un error')
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body
    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error('Token no válido')
      res.status(401).json({ error: error.message })
      return
    }
    user.confirmed = true
    user.token = null
    await user.save()
    res.send('Cuenta confirmada correctamente')
  }

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    // Revisar que el usuario exista
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('Usuario no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    if (!user.confirmed) {
      const error = new Error('La cuenta no ha sido confirmada')
      res.status(403).json({ error: error.message })
      return
    }
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const error = new Error('Contraseña incorrecta')
      res.status(403).json({ error: error.message })
      return
    }
    const token = generateJWT(user.id)
    res.json(token)
  }

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body
    // Revisar que el usuario exista
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('Usuario no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    user.token = generateToken()
    await user.save()
    AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token,
    })
    res.send('Revisa tu email para reestablecer tu contraseña')
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body

    const tokenExists = await User.findOne({ where: { token } })
    if (!tokenExists) {
      const error = new Error('Token no válido')
      res.status(404).json({ error: error.message })
      return
    }
    res.send('Token válido')
  }

  static resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error('Token no válido')
      res.status(404).json({ error: error.message })
      return
    }
    user.password = await hashPassword(password)
    user.token = null
    user.save()

    res.send('Contraseña actualizada correctamente')
  }

  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }
}

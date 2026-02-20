import { transport } from '@/config/nodemailer'
import { confirmationEmailTemplate } from './templates/confirmationEmail'
import { resetPasswordEmailTemplate } from './templates/resetPasswordEmail'

type EmailType = {
  name: string
  email: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const confirmUrl = `${process.env.FRONTEND_URL}/auth/confirm-account`

    const email = await transport.sendMail({
      from: 'CashTrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'CashTrackr - Confirma tu cuenta',
      html: confirmationEmailTemplate(
        {
          name: user.name,
          token: user.token,
        },
        confirmUrl
      ),
    })
    console.log('Email enviado correctamente', email.messageId)
  }

  static sendPasswordResetToken = async (user: EmailType) => {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/new-password`

    const email = await transport.sendMail({
      from: 'CashTrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'CashTrackr - Recupera tu contraseña',
      html: resetPasswordEmailTemplate(
        {
          name: user.name,
          token: user.token,
        },
        resetUrl
      ),
    })
    console.log('Email enviado correctamente', email.messageId)
  }
}

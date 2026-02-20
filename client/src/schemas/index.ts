import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.email('El correo electrónico es obligatorio'),
    name: z.string().min(1, { message: 'El nombre es obligatorio' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  })
export const LoginSchema = z.object({
  email: z.email({ message: 'Email no válido' }),
  password: z.string().min(1, { message: 'El password no puede ir vacio' }),
})
export type RegisterFormData = z.infer<typeof RegisterSchema>
export const SuccessSchema = z.string()
export const ErrorResponseSchema = z.object({
  error: z.string(),
})
export const TokenSchema = z
  .string({ message: 'Token no válido' })
  .length(6, { message: 'Token no válido' })

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
})
export type User = z.infer<typeof UserSchema>
export const ForgotPasswordSchema = z.object({
  email: z.email({ message: 'Email no válido' }),
})
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'La contraseña debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no son iguales',
    path: ['password_confirmation'],
  })

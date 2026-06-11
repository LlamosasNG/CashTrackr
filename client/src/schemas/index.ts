import { z } from 'zod'

/** Autenticación de Usuarios */
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

export const SuccessResponseSchema = z.string()
export const ErrorResponseSchema = z.object({
  error: z.string(),
})

/** Presupuestos */
export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
  amount: z.coerce
    .number({ message: 'Cantidad no válida' })
    .min(1, { message: 'Cantidad no válida' }),
})

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema)
export type Budget = z.infer<typeof BudgetAPIResponseSchema>

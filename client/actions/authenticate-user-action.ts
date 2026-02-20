'use server'

import { ErrorResponseSchema, LoginSchema } from '@/src/schemas'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type ActionStateType = {
  errors: string[]
  success: string
}

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData
) {
  const LoginCredentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const auth = LoginSchema.safeParse(LoginCredentials)
  if (!auth.success) {
    return {
      errors: auth.error.issues.map((issue) => issue.message),
      success: '',
    }
  }
  const url = `${process.env.API_URL}/auth/login`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  })
  const json = await req.json()
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
      success: '',
    }
  }
  ;(await cookies()).set({
    name: 'CASHTRACKR_TOKEN',
    value: json,
    httpOnly: true,
    path: '/',
  })

  redirect('/admin')
}

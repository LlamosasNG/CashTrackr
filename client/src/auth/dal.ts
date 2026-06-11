import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { UserSchema } from '../schemas'
import getToken from '@/src/auth/token'

export const verifySession = cache(async () => {
  const token = await getToken()
  if (!token) {
    redirect('/auth/login')
  }
  const url = `${process.env.API_URL}/auth/user`
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const session = await req.json()
  const result = UserSchema.safeParse(session)
  if (!result.success) {
    redirect('/auth/login')
  }

  return {
    user: result.data,
    isAuth: true,
  }
})

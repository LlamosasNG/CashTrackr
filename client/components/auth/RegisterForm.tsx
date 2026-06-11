'use client'

import { register } from '@/actions/create-account-action'
import { useActionState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [state, dispatch] = useActionState(register, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    if (state.errors) state.errors.forEach((error) => toast.error(error))
    if (state.success) {
      toast.success(state.success)
      ref.current?.reset()
    }
  }, [state])

  return (
    <form ref={ref} noValidate action={dispatch} className="mt-14 space-y-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          defaultValue={state.formData?.email ?? ''}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Nombre</label>
        <input
          id="name"
          type="name"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
          defaultValue={state.formData?.name ?? ''}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
          defaultValue={state.formData?.password ?? ''}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.formData?.password_confirmation ?? ''}
        />
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer block"
      />
    </form>
  )
}

'use client'

import { createBudget } from '@/actions/create-budget-action'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function CreateBudgetForm() {
  const [state, dispatch] = useActionState(createBudget, {
    errors: [],
    success: '',
  })

  const router = useRouter()
  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/admin')
        },
        onClick: () => {
          router.push('/admin')
        },
      })
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-3" noValidate>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          name="name"
          placeholder="Nombre del Presupuesto"
          defaultValue={state.formData?.name ?? ''}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          id="amount"
          type="number"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          name="amount"
          placeholder="Cantidad del Presupuesto"
          defaultValue={state.formData?.amount ?? ''}
        />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  )
}

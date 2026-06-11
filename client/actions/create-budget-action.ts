'use server'

import getToken from '@/src/auth/token'
import { DraftBudgetSchema, SuccessResponseSchema } from '@/src/schemas'
import { cookies } from 'next/headers'

type ActionStateType = {
  errors: string[]
  success: string
  formData?: {
    name: string
    amount: string
  }
}

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
) {
  const budgetData = {
    name: formData.get('name') as string,
    amount: formData.get('amount') as string,
  }
  const budget = DraftBudgetSchema.safeParse(budgetData)
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: '',
      formData: budgetData,
    }
  }

  const token = await getToken()
  const url = `${process.env.API_URL}/budgets`
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  })

  const json = await req.json()
  const success = SuccessResponseSchema.parse(json)

  return {
    errors: [],
    success,
  }
}

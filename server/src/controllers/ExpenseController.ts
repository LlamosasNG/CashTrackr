import Expense from '@/models/Expense'
import { Request, Response } from 'express'

export class ExpenseController {
  static createExpense = async (req: Request, res: Response) => {
    try {
      const expense = await Expense.create(req.body)
      expense.budgetId = req.budget.id
      expense.save()
      res.status(201).json('Gasto agregado correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' })
    }
  }

  static getExpenseById = async (req: Request, res: Response) => {
    res.json(req.expense)
  }

  static updateExpenseById = async (req: Request, res: Response) => {
    await req.expense.update(req.body)
    res.json('Gasto Actualizado Correctamente')
  }

  static deleteExpenseById = async (req: Request, res: Response) => {
    await req.expense.destroy()
    res.json('Gasto Eliminado Correctamente')
  }
}

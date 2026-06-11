import Expense from '@/models/Expense'
import { NextFunction, Request, RequestParamHandler, Response } from 'express'
import { body, param, validationResult } from 'express-validator'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}
export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('budgetId')
    .isInt()
    .custom((value) => value > 0)
    .withMessage('ID no válido')
    .run(req)
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateExpenseExists: RequestParamHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  expenseId
) => {
  try {
    const expense = await Expense.findByPk(expenseId)
    if (!expense) {
      const error = new Error('Gasto no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    req.expense = expense
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })
  }
}

export const validateExpenseInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body('name')
    .notEmpty()
    .withMessage('El nombre del gasto no puede ir vacío')
    .run(req)
  await body('amount')
    .notEmpty()
    .withMessage('La cantidad del gasto no puede ir vacía')
    .isNumeric()
    .withMessage('Cantidad no válida')
    .custom((value) => value > 0)
    .withMessage('La cantidad del gasto debe ser mayor a 0')
    .run(req)
  next()
}

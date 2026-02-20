import Budget from '@/models/Budget'
import type { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'

declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}
export const validateBudgetId = async (
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

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetId } = req.params
    const budget = await Budget.findByPk(budgetId)
    if (!budget) {
      const error = new Error('Presupuesto no encontrado')
      return res.status(404).json({ error: error.message })
    }
    req.budget = budget
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error' })
  }
}

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body('name')
    .notEmpty()
    .withMessage('El nombre del presupuesto no puede ir vacío')
    .run(req)
  await body('amount')
    .notEmpty()
    .withMessage('La cantidad del presupuesto no puede ir vacía')
    .isNumeric()
    .withMessage('Cantidad no válida')
    .custom((value) => value > 0)
    .withMessage('La cantidad del presupuesto debe ser mayor a 0')
    .run(req)
  next()
}

export const hasAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.budget.userId !== req.user.id) {
    const error = new Error('Acción no válida')
    res.status(401).json({ error: error.message })
    return
  }
  next()
}

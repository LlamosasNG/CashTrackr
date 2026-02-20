import { BudgetController } from '@/controllers/BudgetController'
import { ExpenseController } from '@/controllers/ExpenseController'
import { authenticate } from '@/middleware/auth'
import { Router } from 'express'
import {
  hasAccess,
  validateBudgetExists,
  validateBudgetId,
  validateBudgetInput,
} from '../middleware/budget'
import {
  validateExpenseExists,
  validateExpenseInput,
} from '../middleware/expense'
import { handleInputErrors } from '../middleware/validation'

const router: Router = Router()

router.use(authenticate)

/** Budgets */
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)
router.param('budgetId', hasAccess)

router.post(
  '/',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.createBudget
)

router.get('/', BudgetController.getAllBudgets)
router.get('/:budgetId', BudgetController.getBudgetById)

router.put(
  '/:budgetId',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateBudgetById
)

router.delete('/:budgetId', BudgetController.deleteBudgetById)

/** Expenses */
router.param('expenseId', validateBudgetId)
router.param('expenseId', validateExpenseExists)

router.post(
  '/:budgetId/expenses',
  validateExpenseInput,
  handleInputErrors,
  ExpenseController.createExpense
)
router.get('/:budgetId/expenses/:expenseId', ExpenseController.getExpenseById)
router.put(
  '/:budgetId/expenses/:expenseId',
  validateExpenseInput,
  handleInputErrors,
  ExpenseController.updateExpenseById
)
router.delete(
  '/:budgetId/expenses/:expenseId',
  ExpenseController.deleteExpenseById
)

export default router

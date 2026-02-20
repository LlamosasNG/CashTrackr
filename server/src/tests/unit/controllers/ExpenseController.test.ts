import { ExpenseController } from '@/controllers/ExpenseController'
import Expense from '@/models/Expense'
import { expenses } from '@/tests/mocks/expense'
import { createRequest, createResponse } from 'node-mocks-http'

jest.mock('@/models/Expense', () => ({
  create: jest.fn(),
}))

describe('ExpenseController.createExpense', () => {
  it('Should create a new expense', async () => {
    const expenseMock = {
      save: jest.fn().mockResolvedValue(true),
    }
    ;(Expense.create as jest.Mock).mockResolvedValue(expenseMock)
    const req = createRequest({
      method: 'POST',
      url: 'api/budgets/:budgetId/expenses',
      body: { name: 'Gasto de Prueba', amount: 5000 },
      budget: { id: 1 },
    })
    const res = createResponse()
    await ExpenseController.createExpense(req, res)

    expect(res.statusCode).toBe(201)
    expect(res._getJSONData()).toEqual('Gasto agregado correctamente')
    expect(expenseMock.save).toHaveBeenCalled()
    expect(expenseMock.save).toHaveBeenCalledTimes(1)
    expect(Expense.create).toHaveBeenCalledWith(req.body)
  })

  it('Should handle expense creation error', async () => {
    const expenseMock = {
      save: jest.fn().mockResolvedValue(true),
    }
    ;(Expense.create as jest.Mock).mockRejectedValue(new Error())
    const req = createRequest({
      method: 'POST',
      url: 'api/budgets/:budgetId/expenses',
      body: { name: 'Gasto de Prueba', amount: 5000 },
      budget: { id: 1 },
    })
    const res = createResponse()
    await ExpenseController.createExpense(req, res)

    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Hubo un error' })
    expect(expenseMock.save).not.toHaveBeenCalled()
    expect(Expense.create).toHaveBeenCalledWith(req.body)
  })
})

describe('ExpenseController.getExpenseById', () => {
  it('Should return expense with ID 1', async () => {
    const req = createRequest({
      method: 'GET',
      url: 'api/budgets/:budgetId/expenses/:expenseId',
      expense: expenses[0],
    })
    const res = createResponse()

    await ExpenseController.getExpenseById(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(expenses[0])
  })
})

describe('ExpenseController.updateExpenseById', () => {
  it('Should update expense and return a sucess message', async () => {
    const expenseMock = {
      ...expenses[0],
      update: jest.fn().mockResolvedValue(true),
    }
    const req = createRequest({
      method: 'PUT',
      url: 'api/budgets/:budgetId/expenses/:expenseId',
      expense: expenseMock,
      body: { name: 'Presupuesto de Prueba Actualizado', amount: 5500 },
    })
    const res = createResponse()

    await ExpenseController.updateExpenseById(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual('Gasto Actualizado Correctamente')
    expect(expenseMock.update).toHaveBeenCalled()
    expect(expenseMock.update).toHaveBeenCalledWith(req.body)
    expect(expenseMock.update).toHaveBeenCalledTimes(1)
  })
})

describe('ExpenseController.deleteExpenseById', () => {
  it('Should delete expense and return a sucess message', async () => {
    const expenseMock = {
      ...expenses[0],
      destroy: jest.fn().mockResolvedValue(true),
    }
    const req = createRequest({
      method: 'DELETE',
      url: 'api/budgets/:budgetId/expenses/:expenseId',
      expense: expenseMock,
    })
    const res = createResponse()

    await ExpenseController.deleteExpenseById(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual('Gasto Eliminado Correctamente')
    expect(expenseMock.destroy).toHaveBeenCalled()
    expect(expenseMock.destroy).toHaveBeenCalledTimes(1)
  })
})

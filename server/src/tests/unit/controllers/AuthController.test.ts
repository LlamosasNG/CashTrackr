import { AuthController } from '@/controllers/AuthController'
import { AuthEmail } from '@/emails/AuthEmail'
import User from '@/models/User'
import { MockRes } from '@/tests/types'
import { hashPassword } from '@/utils/auth'
import { generateToken } from '@/utils/token'
import { createRequest, createResponse } from 'node-mocks-http'

jest.mock('@/models/User')
jest.mock('@/utils/auth')
jest.mock('@/utils/token')

describe('AuthController.createAccount', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return a 409 status and error message if the email is already registered', async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue(true)
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/create-account',
      body: {
        email: 'test@email.com',
        password: 'testpassword',
      },
    })
    const res = createResponse() as MockRes
    await AuthController.createAccount(req, res)

    const data = res._getJSONData()
    expect(res.statusCode).toBe(409)
    expect(data).toHaveProperty(
      'error',
      'Un usuario ya esta registrado con el mismo email'
    )
    expect(User.findOne).toHaveBeenCalled()
    expect(User.findOne).toHaveBeenCalledTimes(1)
  })

  it('should register a new user and return a success message', async () => {
    const req = createRequest({
      method: 'POST',
      url: '/api/auth/create-account',
      body: {
        email: 'test@email.com',
        password: 'testpassword',
      },
    })
    const res = createResponse() as MockRes
    const mockUser = { ...req.body, save: jest.fn() }

    const tokenTest = '123456'

    ;(User.create as jest.Mock).mockResolvedValue(mockUser)
    ;(hashPassword as jest.Mock).mockResolvedValue('hashedPassword')
    ;(generateToken as jest.Mock).mockReturnValue(tokenTest)
    jest
      .spyOn(AuthEmail, 'sendConfirmationEmail')
      .mockImplementation(() => Promise.resolve())

    await AuthController.createAccount(req, res)

    expect(User.create).toHaveBeenCalledWith(req.body)
    expect(User.create).toHaveBeenCalledTimes(1)
    expect(mockUser.save).toHaveBeenCalled()
    expect(mockUser.password).toBe('hashedPassword')
    expect(mockUser.token).toBe(tokenTest)
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      token: tokenTest,
    })
    expect(AuthEmail.sendConfirmationEmail).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(201)
  })
})

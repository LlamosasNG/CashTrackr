import { Response } from 'express'
import { MockResponse } from 'node-mocks-http'

export type MockRes = MockResponse<Response> & { statusCode: number }

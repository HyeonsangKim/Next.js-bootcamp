import {setupServer} from 'msw/node'
import { apis } from './app'

export const server = setupServer(...apis)
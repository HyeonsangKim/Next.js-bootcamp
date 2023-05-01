import {server} from './src/commons/mock'
beforeAll(()=>server.listen())
afterAll(()=>server.close())
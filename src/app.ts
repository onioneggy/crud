import express, {Request, Response, NextFunction} from 'express'
import { json } from 'body-parser'
import router from "./routes"
import { EmployeeController } from './controller'
import { InMemoryEmployeeRepository } from './repository/memory'
import { SqlEmployeeRepository } from './repository/sql'
import { pool } from './database'
import cors from 'cors'

const repository = new SqlEmployeeRepository(pool)
const controller = new EmployeeController(repository)
const routes = router(controller)

const app = express()
app.use(cors())
app.use(json())
app.use('/employee', routes)
app.use((err: Error, request: Request,response: Response, next: NextFunction) => {
    response.status(500).json({errorMessage: err.message})

})
app.use("*", (request: Request, response: Response) => {
    response.status(404).json({errorMessage: "Not Found"})
}) 
app.listen(3001)
import express, {Request, Response, NextFunction} from 'express'
import { json } from 'body-parser'
import employeeRoutes from "./employees/routes"
import { EmployeeController } from './employees/controller'
import { InMemoryEmployeeRepository } from './employees/repository/memory'
import { SqlEmployeeRepository } from './employees/repository/sql'
import { pool } from './database'
import cors from 'cors'
import 'dotenv/config'

const repository = new SqlEmployeeRepository(pool)
const controller = new EmployeeController(repository)
const employeeRoute = employeeRoutes(controller)
const app = express()
app.use(cors())
app.use(json())
app.use('/employee', employeeRoute)
app.use((err: Error, request: Request,response: Response, next: NextFunction) => {
    response.status(500).json({errorMessage: err.message})

})
app.use("*", (request: Request, response: Response) => {
    response.status(404).json({errorMessage: "Not Found"})
}) 
app.listen(3001)
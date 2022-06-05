import express, {Request, Response, NextFunction} from 'express'
import { json } from 'body-parser'
import employeeRoutes from "./employees/routes"
import { EmployeeController } from './employees/controller'
import { SqlEmployeeRepository } from './employees/repository/sql'
import { pool } from './database'
import cors from 'cors'
import 'dotenv/config'
import { SqlUserRepository } from './users/repository/sql'
import { UserController } from './users/controller'
import userRoutes from './users/routes'
import { SequelizeEmployeeRepository } from './employees/repository/sequelize'
import { SequelizeUserRepository } from './users/repository/sequelize'

const repository = new SequelizeEmployeeRepository()
const controller = new EmployeeController(repository)
const employeeRoute = employeeRoutes(controller)
const userRepo = new SequelizeUserRepository
const userCon = new UserController(userRepo)
const userRoute = userRoutes(userCon)

const app = express()
app.use(cors())
app.use(json())
app.use('/employee', employeeRoute)
app.use('/user', userRoute)
app.use((err: Error, request: Request,response: Response, next: NextFunction) => {
    response.status(500).json({errorMessage: err.message})

})
app.use("*", (request: Request, response: Response) => {
    response.status(404).json({errorMessage: "Not Found"})
}) 
app.listen(3001)
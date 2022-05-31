import { RequestHandler } from "express"
import { Employee, Department } from "../models"
import { EmployeeRepository } from "../repository"

const Joi = require('joi')
const schema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    salary: Joi.number().min(0).required(),
    department: Joi.string().insensitive().options({convert: true}).valid(...Object.values(Department)).required()
})

export class EmployeeController {
    private repository: EmployeeRepository
    constructor(repository: EmployeeRepository) {
        this.repository = repository
    } 

    getEmployeeAll: RequestHandler = async (request, response) => {
        const employees = await this.repository.findAllEmployees()
        response.status(200).json(employees)
    }
    
    getEmployee: RequestHandler = async (request, response) => {
        const id = Number(request.params.id)
        const employee = await this.repository.findEmployeeWithId(id)
        if (!employee) {
            return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
        }
        response.status(200).json(employee)
    }
    
    delEmployee: RequestHandler = async (request, response) => {
        const id = Number(request.params.id)
        if (!(await this.repository.findEmployeeWithId(id))) {
            return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
        }
        await this.repository.deleteEmployeeWithId(id)
        response.status(204).end()
    }
    
    addEmployee: RequestHandler = async (request, response) => {
        const {error, value} = schema.validate(request.body)
        if (error) {
            return response.status(400).json({errorMessage: error.message})
        }
        const employee = await this.repository.addNewEmployee(value)
        response.status(200).json(employee)
    
    }
    
    updateData: RequestHandler = async (request, response) => {
        const id = Number(request.params.id)
        console.log(request.body)
        const {error, value} = schema.validate(request.body)
        if (error) {
            return response.status(400).json({errorMessage: error.message})
        }
        const employeeToBeUpdated = new Employee(id, value.name, value.salary, value.department)
        const prevEmployee = await this.repository.updateEmployee(employeeToBeUpdated)
        if (!prevEmployee) {
            return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
        }

        if (prevEmployee.isEqualTo(employeeToBeUpdated)) {
            return response.status(304).end()
        }
    
        response.status(200).json(employeeToBeUpdated)
    }
}

import { RequestHandler } from "express"
import { Employee } from "../models/employeeMod"
import { Department } from "../models/employeeMod"
const Joi = require('joi')
const schema = Joi.object({
    name: Joi.string().min(2).required(),
    salary: Joi.number().required(),
    department: Joi.string().valid(...Object.values(Department)).required()
})

let employees: Employee[] = []
let idtag = 0
export const getEmployeeAll: RequestHandler = (request, response) => {
    response.status(200).json({employees: employees})
}

export const getEmployee: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const employee = findEmployeeWithID(id)
    if (!employee) {
        return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
    }
    response.status(200).json(employee)
}

export const delEmployee: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    if (!findEmployeeWithID(id)) {
        return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
    }
    employees = employees.filter(employee => employee.id !== id )
    response.status(204)
}

export const addEmployee: RequestHandler = (request, response, next) => {
    const {error, value} = schema.validate(request.body)
    if (error) {
        return response.status(400).json({errorMessage: error.message})
    }
    const employee = new Employee(idtag, value.name, value.salary, value.department)
    employees.push(employee)
    idtag++
    response.status(200).json(employees)

}

export const updateData: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    if (!findEmployeeWithID(id)) {
        return response.status(404).json({errorMessage: `No Employee with id: ${id} was found`})
    }
    const {error, value} = schema.validate(request.body)
    if (error) {
        return response.status(400).json({errorMessage: error.message})
    }
    const newData = {
        name: value.name,
        salary: value.salary,
        department: value.department
    }

    if (checkIfSame(id,newData)) {
        return response.status(304).end()
    }
    const newEmployeeData = {
        id:id,
        name: newData.name,
        salary: newData.salary,
        department: newData.department
    }
    employees = employees.map(employee => employee.id === newEmployeeData.id ? newEmployeeData : employee)
    response.status(200).json(findEmployeeWithID(id))
}

const findEmployeeWithID = (id: number): Employee | undefined => {
    return employees.find(employee => employee.id === id) 
}

const checkIfSame = (id: number, newData: {name: string, salary: number, department: Department}) => {
    const currData = employees.find(employee => employee.id === id)
    return currData!.name === newData.name && currData!.salary === newData.salary && newData.department === currData!.department
}
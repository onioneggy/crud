import { RequestHandler } from "express"
import { Employee } from "../models/employeeMod"

let employees: Employee[] = []
let idtag = 0
export const getEmployeeAll: RequestHandler = (request, response) => {
    response.status(200).json({employees: employees})
}

export const getEmployee: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const employee = employees.find(employee => employee.id === id )
    response.status(200).json(employee)
}

export const newEmployee: RequestHandler = (request, response) => {

}

export const delEmployee: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    employees = employees.filter(employee => employee.id !== id )
    response.status(200).json(employees)
}

export const addEmployee: RequestHandler = (request, response) => {
    const employ = request.body
    const newEmploy = {
        id: idtag,
        name: employ.name,
        salary: employ.salary,
        department: employ.department
    }
    employees.push(newEmploy)
    idtag++
    response.status(200).json(employees)

}

export const newData: RequestHandler = (request, response) => {
    const id = Number(request.params.id)
    const employ = request.body
    const newName = employ.name
    const newSalary = employ.salary
    const newDepart = employ.department
    employees[id] = {
        id:id, 
        name:newName, 
        salary: newSalary, 
        department: newDepart}
    response.status(200).json(employees[id])
}
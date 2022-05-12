import { EmployeeRepository, CreateEmployeeRequest } from "."
import { Employee } from "../models"

export class InMemoryEmployeeRepository implements EmployeeRepository {
    private idTag: number
    private employees: Employee[]
    constructor(idTag: number = 0, employees: Employee[] = []) {
        this.idTag = idTag
        this.employees = employees
    }
    
    async findAllEmployees(): Promise<Employee[]> {
        return this.employees
    }

    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        return this.employees.find(employee => employee.id === id)   
    }
    
    async deleteEmployeeWithId(id: number): Promise<void> {
        this.employees = this.employees.filter(employee => employee.id !== id) 
    }

    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        const newEmployee = new Employee(this.idTag, request.name, request.salary, request.department)
        this.idTag++
        this.employees.push(newEmployee)
        return newEmployee
    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        const employeeToBeUpdated = await this.findEmployeeWithId(employee.id)
        if (employeeToBeUpdated)
            this.employees = this.employees.map(prev => prev.id === employee.id ? employee : prev)

        return employeeToBeUpdated
    }
}
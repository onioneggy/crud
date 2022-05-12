import { EmployeeRepository, CreateEmployeeRequest } from ".";
import { Employee } from "../models";
import { Pool } from "pg"

export class SqlEmployeeRepository implements EmployeeRepository {
    
    constructor(private pool: Pool) {}

    async findAllEmployees(): Promise<Employee[]> {
        return []
    }

    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        return undefined
    }
    
    async deleteEmployeeWithId(id: number): Promise<void> {
        
    }

    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        const newEmployee = new Employee(0, request.name, request.salary, request.department)
        return newEmployee
    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        return undefined
    }
}
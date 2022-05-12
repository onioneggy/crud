import { Department, Employee } from "../models"

export type CreateEmployeeRequest = {
    name: string,
    salary: number,
    department: Department
}

export interface EmployeeRepository {
    findAllEmployees(): Promise<Employee[]>
    // Returns undefined if employee not found
    findEmployeeWithId(id: number): Promise<Employee | undefined>
    deleteEmployeeWithId(id: number): Promise<void>
    addNewEmployee(request: CreateEmployeeRequest): Promise<Employee>
    // Returns old value of employee
    updateEmployee(employee: Employee): Promise<Employee | undefined>
}

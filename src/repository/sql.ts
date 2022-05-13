import { EmployeeRepository, CreateEmployeeRequest } from ".";
import { Employee } from "../models";
import { Pool } from "pg"

export class SqlEmployeeRepository implements EmployeeRepository {
    private idTag: number = 0
    constructor(private pool: Pool) {}

    async findAllEmployees(): Promise<Employee[]> {
        const employees = await this.pool.query(`select * from employee`)
        // console.log(employees)
        const result = employees.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        console.log(result)
        return result
    }

    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        const employeeWithId = await this.pool.query(`select * from employee where id=${id}`)
        console.log(employeeWithId)
        const result = employeeWithId.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        console.log(result[0])
        return result[0]
    }
    
    async deleteEmployeeWithId(id: number): Promise<void> {
        await this.pool.query(`delete from employee where id=${id}`)
    }

    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        const query = `insert into employee values(${this.idTag}, '${request.name}', ${request.salary}, '${request.department}')`
        console.log(query)
        await this.pool.query(query)

        const newEmployee = await this.pool.query(`select * from employee where id=${this.idTag}`)
        const result = newEmployee.rows.map(employee => new Employee(this.idTag, employee.name, employee.salary, employee.department))
        this.idTag++
        console.log(result[0])
        return result[0]
    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        const employeeToBeUpdated = await this.findEmployeeWithId(employee.id)
        if (employeeToBeUpdated) {
            const query = `update employee set name='${employee.name}', salary=${employee.salary}, department='${employee.department}' where id=${employee.id}`
            await this.pool.query(query)
            // console.log(query)
        }

        return employeeToBeUpdated
    }
}
import { EmployeeRepository, CreateEmployeeRequest } from ".";
import { Employee } from "../models";
import { Pool } from "pg"

export class SqlEmployeeRepository implements EmployeeRepository {
    constructor(private pool: Pool) {}

    async findAllEmployees(): Promise<Employee[]> {
        console.log('loreng')
        const employees = await this.pool.query(`select * from employees`)
        const result = employees.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        return result
    }

    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        const employeeWithId = await this.pool.query(`select * from employees where id=$1`, [id])
        const result = employeeWithId.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        return result[0]
    }
    
    async deleteEmployeeWithId(id: number): Promise<void> {
        await this.pool.query(`delete from employees where id=${id}`)
        return
    }

    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        const query = `insert into employees values(default, $1, $2, $3) returning id`
        const id = (await this.pool.query(query, [request.name, request.salary, request.department])).rows[0].id

        const newEmployee = await this.pool.query(`select * from employees where id=$1`, [id])
        const result = newEmployee.rows.map(employee => new Employee(id, employee.name, employee.salary, employee.department))
        return result[0]
    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        const employeeToBeUpdated = await this.findEmployeeWithId(employee.id)
        if (employeeToBeUpdated) {
            const query = `update employees set name=$1, salary=$2, department=$3 where id=$4`
            await this.pool.query(query, [employee.name, employee.salary, employee.department, employee.id])
            
        }

        return employeeToBeUpdated
    }
}

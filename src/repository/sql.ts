import { EmployeeRepository, CreateEmployeeRequest } from ".";
import { Employee } from "../models";
import { Pool } from "pg"

export class SqlEmployeeRepository implements EmployeeRepository {
    // private idTag: number = 0
    constructor(private pool: Pool) {}

    async findAllEmployees(): Promise<Employee[]> {
        const employees = await this.pool.query(`select * from employee`)
        // console.log(employees)
        const result = employees.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        console.log(result)
        return result
    }

    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        const employeeWithId = await this.pool.query(`select * from employee where id=$1`, [id])
        console.log(employeeWithId)
        const result = employeeWithId.rows.map(employee => new Employee(employee.id, employee.name, employee.salary, employee.department))
        console.log(result[0])
        return result[0]
    }
    
    async deleteEmployeeWithId(id: number): Promise<void> {
        await this.pool.query(`delete from employee where id=${id}`)
        return
    }

    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        const query = `insert into employee values(default, $1, $2, $3) returning id`
        console.log(query)
        const id = (await this.pool.query(query, [request.name, request.salary, request.department])).rows[0].id
        console.log(id)

        const newEmployee = await this.pool.query(`select * from employee where id=$1`, [id])
        const result = newEmployee.rows.map(employee => new Employee(id, employee.name, employee.salary, employee.department))
        console.log(result[0])
        return result[0]
    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        const employeeToBeUpdated = await this.findEmployeeWithId(employee.id)
        if (employeeToBeUpdated) {
            const query = `update employee set name=$1, salary=$2, department=$3 where id=$4`
            console.log(query)
            await this.pool.query(query, [employee.name, employee.salary, employee.department, employee.id])
            
        }

        return employeeToBeUpdated
    }
}

// create table employee (
// id int,
// name varchar(2),
// salary int,
// department varchar(2));
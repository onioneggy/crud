import { CreateEmployeeRequest, EmployeeRepository } from ".";
import { Department, Employee } from "../models";
import { SequelizeEmployees } from "../sequelize/employeeModel";

export class SequelizeEmployeeRepository implements EmployeeRepository {
    
    async findAllEmployees(): Promise<Employee[]> {
        const employees = await SequelizeEmployees.findAll({raw: true, attributes: ['id', 'name', 'salary', 'department']})
        const employeeList: Employee[] = employees.map(emp => new Employee(emp.id as number, emp.name as string, emp.salary as number, emp.department as Department))
        return employeeList
        
    }
    async findEmployeeWithId(id: number): Promise<Employee | undefined> {
        const SeqEmployee = await SequelizeEmployees.findByPk(id)
        const employee = new Employee(SeqEmployee?.id as number, SeqEmployee?.name as string, SeqEmployee?.salary as number, SeqEmployee?.department as Department)
        return employee
    }
    async deleteEmployeeWithId(id: number): Promise<void> {
        await SequelizeEmployees.destroy({where: {id}})
    }
    async addNewEmployee(request: CreateEmployeeRequest): Promise<Employee> {
        await SequelizeEmployees.create({name: request.name, salary: request.salary, department: request.department})
        const emp = await SequelizeEmployees.findOne({raw: true, where: {name: request.name}})
        const adjusted = new Employee(emp?.id as number, emp!.name as string, emp?.salary as number, emp?.department as Department)
        return adjusted


    }

    async updateEmployee(employee: Employee): Promise<Employee | undefined> {
        const employeeToBeUpdated = await this.findEmployeeWithId(employee.id)
        if (employeeToBeUpdated) {
            await SequelizeEmployees.update({name: employee.name, salary: employee.salary, department: employee.department}, {where: {id: employee.id}} )
        }

        return employeeToBeUpdated
    }
    
}
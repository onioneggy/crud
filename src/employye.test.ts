import { Department, Employee } from "./employees/models";

const employeeTest = new Employee(1, "hello", 100, Department.HR)
test('employee data', () => {
    expect(employeeTest.name).toBe('hello')
    expect(employeeTest.salary).toBeDefined()
})
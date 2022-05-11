"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newData = exports.addEmployee = exports.delEmployee = exports.getEmployee = exports.getEmployeeAll = void 0;
let employees = [];
let idtag = 0;
const getEmployeeAll = (request, response) => {
    response.status(200).json({ employees: employees });
};
exports.getEmployeeAll = getEmployeeAll;
const getEmployee = (request, response) => {
    const id = Number(request.params.id);
    console.log(id);
    const employee = employees.find(employee => employee.id === id);
    response.status(200).json(employee);
};
exports.getEmployee = getEmployee;
const delEmployee = (request, response) => {
    const id = Number(request.params.id);
    employees = employees.filter(employee => employee.id !== id);
    response.status(200).json(employees);
};
exports.delEmployee = delEmployee;
const addEmployee = (request, response) => {
    const employ = request.body;
    const newEmploy = {
        id: idtag,
        name: employ.name,
        salary: employ.salary,
        department: employ.department
    };
    employees.push(newEmploy);
    idtag++;
    response.status(200).json(employees);
};
exports.addEmployee = addEmployee;
const newData = (request, response) => {
    const id = Number(request.params.id);
    const employ = request.body;
    const newName = employ.name;
    const newSalary = employ.salary;
    const newDepart = employ.department;
    employees[id] = {
        id: id,
        name: newName,
        salary: newSalary,
        department: newDepart
    };
    response.status(200).json(employees[id]);
};
exports.newData = newData;

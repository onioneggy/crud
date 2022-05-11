"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.department = exports.Employee = void 0;
class Employee {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}
exports.Employee = Employee;
var department;
(function (department) {
    department["HR"] = "HR";
    department["PS"] = "PS";
})(department = exports.department || (exports.department = {}));

export class Employee {
    constructor(
                public id: number,
                public name: string,
                public salary: number,
                public department: Department) {}

    isEqualTo(other: Employee): boolean {
        return this.id === other.id && this.name === other.name && this.salary === other.salary && this.department === other.department
    }
}

export enum Department {
    HR = "HR",
    PS = "PS"
}
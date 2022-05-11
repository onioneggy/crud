export class Employee {
    constructor(
                public id: number,
                public name: string,
                public salary: number,
                public department: Department) {}

}

export enum Department {
    HR = "HR",
    PS = "PS"
}
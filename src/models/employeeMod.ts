export class Employee {
    constructor(
                public id: number,
                public name: string,
                public salary: number,
                public department: department) {}

}

export enum department {
    HR = "HR",
    PS = "PS"
}
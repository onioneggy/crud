import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../../database'
import { Department, Employee } from '../models'

export class SequelizeEmployees extends Model {
    id: number | undefined
    name: string | undefined
    salary: number | undefined
    department: Department | undefined
}

SequelizeEmployees.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        // validate: {
        //     isNull: false,
        // },
    },
    department: {
        type: DataTypes.STRING,
        // validate: {
        //     isIn: {
        //         args: [[Department]], 
        //         msg: 'Not part of the department'
        //     },
        //     isNull: false,
        // },
    },
    salary: {
        type: DataTypes.INTEGER,
        // validate: {
        //     isNumeric: true,
        //     isNull: false,
        //     isDecimal: true,
        //     min: 0,
        //     max: 10000000,
        // },
    },

},{
    modelName: "employees",
    sequelize: sequelize,
    timestamps: false
})
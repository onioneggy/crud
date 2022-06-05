import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../../database'

export class SequelizeUser extends Model {
    username: string | undefined
    password: string | undefined
}

SequelizeUser.init({
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }

},
    {
    modelName: "users",
    sequelize: sequelize,
    timestamps: false
    })
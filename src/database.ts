import { Pool } from "pg";
import { Sequelize } from 'sequelize'

export const pool = new Pool({
    user: 'zhaoyan',
    host: 'db',
    database: 'crud',
    password: '12345',
    port: 5432,
});

export const sequelize = new Sequelize('crud', 'zhaoyan', '12345', {
    host: 'db',
    dialect: 'postgres',
    port: 5432,
    username: 'zhaoyan',
    database: 'crud',
    password: '12345',
  });

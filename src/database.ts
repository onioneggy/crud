import { Pool } from "pg";

export const pool = new Pool({
    user: 'zhaoyan',
    host: 'localhost',
    database: 'crud',
    password: '12345',
    port: 5432,
});

export default pool
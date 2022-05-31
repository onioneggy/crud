import { Pool } from "pg";
import { UserRepository } from ".";
import { User } from "../model";

export class SqlUserRepository implements UserRepository {
    constructor(private pool: Pool) {}

    async addUser(user: User): Promise<void> {
        const query = `insert into users values(default, $1, $2)`
        await this.pool.query(query, [user.username, user.password])
    }
    async findUser(name: string): Promise<User | undefined> {
        const query = `select * from users where username=$1`
        const user: User = await (await this.pool.query(query, [name])).rows[0]
        return user
    }

}
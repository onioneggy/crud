import { UserRepository } from ".";
import { User } from "../model";

export class TestRepository implements UserRepository {
    constructor(private usersList: User[]) {}
    async findUser(name: string): Promise<User | undefined> {
        const user = this.usersList.find(user => user.username === name)
        return user
    }

    async addUser(user: User): Promise<void> {
        this.usersList.push(user)
    }

}
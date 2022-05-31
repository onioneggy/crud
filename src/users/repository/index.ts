import { User } from "../model";

export interface UserRepository {
    addUser(user: User): void
    findUser(name: string): Promise<User | undefined>
}
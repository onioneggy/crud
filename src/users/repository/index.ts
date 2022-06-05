import { User } from "../model";

export interface UserRepository {
    addUser(user: User): Promise<void>
    findUser(name: string): Promise<User | undefined>
}
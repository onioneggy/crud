import { RequestHandler } from "express";
import { UserRepository } from "../repository";
import bcrypt from 'bcrypt'
import { User } from "../model";
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10

type LoginRequest = {
    username: string,
    password: string
}

type SignUpRequest = {
    username: string,
    password: string
}

export class UserController {
    constructor(private repository: UserRepository) {}

    login: RequestHandler = async (request, response) => {
        const { username, password }: LoginRequest = request.body
        if (!username || !password) {
            return response.status(400).json({ errorMessage: "Username and password are required fields!" })
        }
        const userFound = await this.repository.findUser(username)
        if (!userFound) {
            return response.status(404).json({ errorMessage: "User not found!" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, userFound.password)

        if (!isPasswordCorrect) {
            return response.status(400).json({ errorMessage: "Invalid Password!"})
        }

        const token = jwt.sign({ username }, process.env.SECRET as string)
        response.status(200).json({ token, username })
    }

    signUp: RequestHandler = async (request, response) => {
        const { username, password }: SignUpRequest = request.body
        if (!username || !password) {
            return response.status(400).json({ errorMessage: "Username and password are required fields!" })
        }
        const userFound = await this.repository.findUser(username)
        if (userFound) {
            return response.status(400).json({ errorMessage: "Username not unique!" })
        }

        try {
            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
            const user: User = {
                username,
                password: passwordHash
            };
            this.repository.addUser(user)
            return response.status(201).end()

        } catch(err) {
                response.status(500).json({ errorMessage: err })
        }
    }
}


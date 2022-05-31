import { Router } from 'express'
import { UserController } from '../controller';


export default (controller: UserController): Router => {
    const userRouter = Router();
    userRouter.post('/login', controller.login)
    userRouter.post('/signup', controller.signUp)
    return userRouter
}

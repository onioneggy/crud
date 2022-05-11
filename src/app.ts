import express, {Request, Response, NextFunction} from 'express'
import { json } from 'body-parser'
import routes from "./routes/routes"

const app = express()
app.use(json())
app.use('/employee', routes)
app.use((err: Error, request: Request,response: Response, next: NextFunction) => {
    response.status(404).json({message: err.message})
})
app.listen(3000)
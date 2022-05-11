import express from 'express'
import { json } from 'body-parser'
import routes from "./routes/routes"

const app = express()
app.use(json())
app.use('/employee', routes)
app.use((request,response) => {})
app.listen(3000)
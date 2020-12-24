import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser';

import todoRoutes from './routes/todos'

const app = express();

const port = 3000 || process.env.PORT

app.use(json())

app.use('/todos', todoRoutes)

app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
    resp.status(500).json({ message: err.message })
})

app.listen(port)
import express, { Express, NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import createHttpError from 'http-errors'
import morgan from 'morgan'

const app: Express = express()

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP. Please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(limiter)

app.use(morgan('dev'))

app.get(
  '/',
  (
    req: Request,

    res: Response
  ) => {
    res.send('Welcome to Ejournal Server')
  }
)

//client error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Route not found !!  404 😭'))
})

export default app

import express, { Application, Request, Response } from 'express'
import routes from './routes'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
import { fstat } from 'fs'

dotenv.config()
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
const port = 3000
app.use(routes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Connected!')
})
app.listen(port, () => {
  const thumbPath = path.resolve(__dirname, '../assets/thumb')
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath)
  }
  console.log(`server started at http://localhost:${port}`)
})

export default app

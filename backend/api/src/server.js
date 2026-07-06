import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { ItemRouter } from './routes/item.routes.js'
const app = express()

app.use(express.json())

const port = process.env.API_PORT

app.use(cors())

app.get('/', (req, res) => {
    return res.send('API funcionando')
})

app.use('/item', ItemRouter)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
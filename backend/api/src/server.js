import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { ItemRouter } from './routes/item.routes.js'
import { CatRouter } from './routes/cat.routes.js'
const app = express()

app.use(express.json())

const port = process.env.API_PORT

app.use(cors())

app.get('/', (req, res) => {
    return res.send('API funcionando')
})

app.use('/item', ItemRouter)
app.use('/cat', CatRouter)


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { ItemRouter } from './routes/item.routes.js'
import { CatRouter } from './routes/cat.routes.js'
import { UserRouter } from './routes/user.route.js' 
import { SetorRouter } from './routes/setor.route.js'
const app = express()

app.use(express.json())

const port = process.env.API_PORT

app.use(cors())

app.get('/', (req, res) => {
    return res.send('API funcionando')
})

app.use('/item', ItemRouter)
app.use('/cat', CatRouter)
app.use('/user', UserRouter)
app.use('/setor', SetorRouter)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
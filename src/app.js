import express from 'express'
import jwtRouter from './routers/jwt.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true})) //como vamos a tomar datos de un formulario voy a necesitar esta linea
app.use(cookieParser())

app.use(express.static('./src/public'))

app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log('Server UP'))
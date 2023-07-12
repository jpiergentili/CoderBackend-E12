import { Router } from "express";
import { generateToken, authToken } from "../utils.js";

const router = Router()
const users = [{ email: 'javypier1@gmail.com', password: 'q1w2e3r4' }] //almacenamiento en memoria

router.post('/register', (req, res) => {
    const user = req.body
    if (users.find(item => item.email === user.email)){
        return res.status(400).json({status: 'error', error: 'User already exists'}) //si el usuario ya existe --> error 400
    }
    users.push(user)
    const access_token = generateToken(user) //genero token con los datos de usuario
    res.json({status: 'success', access_token}) //respondo con el token cuando es exitoso el registro
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)
    if (!user) return res.status(400).json({status: 'error', error: 'Invalid credentials' }) //si las credenciales de login son incorrectas --> error 400
    const access_token = generateToken(user) //genero token con los datos de usuario
    /* res.json({status: 'success', access_token}) //respondo con el token cuando es exitoso el logeo */
    res.cookie('mercadoliebre', access_token).json({status: 'success'}) //guardo el accesstoken en una cookie
})

export default router
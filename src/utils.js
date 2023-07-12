import jwt from "jsonwebtoken"

const PRIVATE_KEY = 'c0d3r'

//con esta funcion generamos el token y le aplicamos la salt con la private_key
export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

//con esta funcion a traves de un middleware hago la autenticación
//si el usuario cuenta con un token valido se le da acceso
export const authToken = (req, res, next) =>{
    const token = req.cookies['mercadoliebre']
    if (!token) return res.status(401).json({error: "Not auth"}) //si no hay token ---> error 401
    jwt.verify(token, PRIVATE_KEY, (error, credentials) =>{
        if (error) return res.status(403).json({error: "Not authorized"}) // si el token no es valido --> error 403
        req.user = credentials.user
        next()
    })
}
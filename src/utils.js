import jwt from "jsonwebtoken"
import passport from "passport"
import { Strategy } from "passport-jwt"

export const PRIVATE_KEY = 'c0d3r'

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

//funcion para personalizar el error en el caso de que no este logueado el usuario
export const passporCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            //si la funcion next no tiene argumento pasa directo al router, si tiene pasa a la funcion de manejo de errores
            if (err) return next(err) 
            if (!user){
                //este caso puede tratarse de un token que no tiene los datos de usuario
                return res.status(401).send({error: info.messages ? info.messages : info.toString()}) 
            }
            //en el caso de que si haya datos de usuario se lo pasa 
            req.user = user
            next()
        })(req, res, next) //esto es una funcion iife , funcion declarada y ejecutada inmnediatamente (Immediately Invoked Function Expression)
    }
}

export const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized'})
        if (req.user.user.role != role) return res.status(403).json({ error: 'No permission'})
        next()
    }
}
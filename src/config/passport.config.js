import passport from "passport";
import jwt, { ExtractJwt } from  "passport-jwt";
import {PRIVATE_KEY} from "../utils.js"

const JWTStrategy = jwt.Strategy

//funcion personalizada para extraer el token de la cookie, si exite lo retorna, sino devuelve null
const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['mercadoliebre'] : null
    return token
}

const initializePassport = () => { //esta funcion se utilizará como middleware en app.js
    passport.use('jwt', new JWTStrategy({
        //esta funcion ExtractJwt extrae el token de diferentes fuentes, en este caso de la cookie a traves de la funcion cookieExtractor
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) => { //payload es el contenido del token, done es el callback
        try {
            return done(null, jwt_payload) //payload es una palabra tecnica que significa la data que esta dentro del token 
        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport
import passport from "passport";
import local from "passport-local";
import userModel from "../models/user.model.js";
import { createHash } from "./bcrypt.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
    }, async (req, username, password, done) => {
        const {first_name, last_name, email, age} = req.body
        try {
            const user = await userModel.findOne( {email: username} )
            if (user) { // verificar si ya existe el email
                console.log('Usuario existente');
                return done(null, false)
            }
            const newUser = {
                first_name, last_name, email, age,
                role: 'user',
                password: createHash(password)
            }
            const userRegistered = await userModel.create(newUser)
            return done(null, userRegistered)
        } catch (err) {
            console.error(err)
            return done('(Register) Error accediendo a la Base de Datos.')
        }
    }))

    passport.use('login', new LocalStrategy({ 
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne( {email: username} )
            if (!user) {
                console.log('Usuario inexistente');
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (err) {
            return done('(Login) Error accediendo a la Base de Datos')
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport
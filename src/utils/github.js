import passport from "passport";
import GithubStrategy from "passport-github2";
import userModel from "../models/user.model.js";
import { createHash } from "./bcrypt.js";
import fs from 'fs'


const initializePassportGH = () => {

    // GITHUB AUTHENTICATION APP data
    let githubApp = ""
    if ( fs.existsSync('./src/github.app') ) {
        githubApp = JSON.parse(fs.readFileSync('./src/github.app', 'utf8'))
    } else {
        console.log('[github2] Falta el archivo github.app. Pídaselo a su Backend amigo!');
    }

    passport.use('github', new GithubStrategy({
        clientID:       githubApp.clientID,
        clientSecret:   githubApp.clientSecret,
        callbackURL:    githubApp.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log('--- profile: ', profile);
        console.log('[github2] Autorizado OK.');
        try {
            const user = await userModel.findOne({email: profile._json.email})
            if (user) return done(null, user)
            const newUser = await userModel.create({
                name: profile._json.login,
                // lastname: profile._json.lastname,
                email: profile._json.email,
            })
            return done(null, newUser)
        } catch (error) {
            return done('Error al iniciar sesión con Github.')
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser( async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    }) 

}

export default initializePassportGH
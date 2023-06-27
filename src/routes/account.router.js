import { Router } from 'express'
//import userModel from '../models/user.model.js'
//import { createHash , isValidPassword } from '../utils/bcrypt.js'
import passport from 'passport'
//import GithubStrategy from "passport-github2";
//import session from 'express-session'
//import FileStore from 'session-file-store'
//import MongoStore from 'connect-mongo'

const router = Router()

// LOGIN

    router.get('/login', (req, res) => {
        res.render('login', {})
    }) //listo

    router.post('/login', passport.authenticate('login', {
        failureRedirect: 'error?url=login', 
    }), async (req, res) => {
        if (!req.user) {
            return res.status(400).render('/errors',{ error: 'Usuario y/o contraseña incorrectas.', volver: 'login'})
        }
        res.status(202).redirect('/products')
    })

// GITHUB LOGIN

    router.get('/github', passport.authenticate('github', { scope: ["user:email"]}), (req, res) => {})

    router.get('/ghcb', passport.authenticate('github', { failureRedirect: 'login'}), async (req, res) => {
        req.session.user = req.user
        res.redirect('/products')
    })

// REGISTRO
    router.get('/register', (req, res) => {
        res.render('register', {})
    }) //listo

    router.post('/register', passport.authenticate('register', {
        failureRedirect: 'error?url=register', 
    }), async (req, res) => {
        const data = req.body
            console.log("🚀 ~ file: account.router.js:45 ~ data:", data)
        res.status(201).render('login', {mensaje: `¡Bienvenido ${data.first_name}! 😎 Ya puedes iniciar sesión`})
    }) //listo

// LOGOUT
    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) return res.status(500).render('errors', {
                error: err
            })
            res.status(200).redirect('/account/login')
        })
    })

// ERROR
    router.get('/error', (req, res) => {
        // res.status(406).send('Error registrando usuario.')
        const url = req.query.url
        let error, volver
        switch (url) {
            case 'login':
                error = 'Usuario y/o contraseña inválidos.'
                volver = 'login'
                break
            case 'register':
                error = 'Email existente, ingrese otro email.'
                volver = 'register'
                break
        }
        res.status(406).render('errors', { error, volver })
    })

export default router
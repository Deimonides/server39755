import { Router } from 'express'
import userModel from '../models/user.model.js'
// import session from 'express-session'
// import FileStore from 'session-file-store'
// import MongoStore from 'connect-mongo'

const router = Router()

// LOGIN

    router.get('/login', (req, res) => {
        res.render('login', {})
    }) //listo

    router.post('/login', async (req, res) => {
        const {email, password} = req.body
            // console.log( '--- user/pass ingresados:', {email, password} );
        const user = await userModel.findOne({ email, password }).lean().exec()
            console.log( '--- user en DB:', user );
        if (!user) {
            return  res.status(401).render('errors', {
                error: 'Mail y/o contraseña incorrectos.',
                volver: 'account/login'
            })
        }
        req.session.logged_user = user
            // console.log('--- req.session.logged_user', req.session.logged_user);
        res.redirect('products')
    })

// REGISTRO

    router.get('/register', (req, res) => {
        res.render('register', {})
    }) //listo

    router.post('/register', async (req, res) => {
        const data = req.body
            // console.log( '--- newUser: ', data );
            // data.push({status: 'active'}, {role: 'user'})
            // console.log( `--- newUser: ${data}` );
        data['role'] = 'user';
        data['active'] = true;
            console.log( '--- newUser: ', data );
        const newUser = new userModel(data)
        await newUser.save()
        // res.redirect('http://localhost:8080/')
        res.status(500).render('login', {mensaje: `¡Bienvenido ${data.name}! 😎 Ya puedes iniciar sesión`})
    }) //listo


// LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('errors', {
            error: err
        })
        res.redirect('/account/login')
    })
})





export default router
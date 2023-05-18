import { Router } from 'express'
import userModel from '../models/user.model.js'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'

const router = Router()


const auth = (req, res, next) => {
    if (req.session.user) return next()
    return res.se
}


router.get('/login', (req, res) => {
    res.render('login', {})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
        // console.log( `--- newUser: ${newUser}` );
    const user = await userModel.findOne({ email, password}).lean().exec()
    if (!user) {
        return res.status(401).render('errors', {
            error: 'Mail y/o contraseña incorrectos.'
        })
    
    }
    req.session.user = user
    
    
    res.redirect('/')
})






router.get('/register', (req, res) => {
    res.render('register', {})
})

router.post('/register', async (req, res) => {
    const newUser = req.body
        // console.log( `--- newUser: ${newUser}` );
    const userGenerated = new userModel(newUser)
    await userGenerated.save()
    res.redirect('/login', {})
})




router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(500).render('errors', {
            error: err
        })
        else res.redirect('/login')
    })
    return res.send('Sesión finalizada.')
})





export default router
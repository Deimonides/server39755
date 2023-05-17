import { Router } from 'express'
import userModel from '../models/user.model.js'
import session from 'express-session'

const router = Router()


const auth = (req, res, next) => {
    if (req.session.user) return next()
    return res.se
}


router.get('/login', (req, res) => {
    res.render('login', {})
})

router.post('/login', async (req, res) => {
    const newUser = req.body
        console.log( `--- newUser: ${newUser}` );
    const userGenerated = new userModel(newUser)
    await userGenerated.save()
        

    res.render('http://localhost:8080/', {})
})



router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error: no se pudo desloguear.')
    })
    return res.send('Sesión finalizada.')
})





export default router
import { Router } from 'express'
import userModel from '../models/user.model.js'
import session from 'express-session'

const router = Router()

app.get('/login', (req, res) => {

})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error: no se pudo desloguear.')
    })
    return res.send('Sesión finalizada.')
})





export default router
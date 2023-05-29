import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'r4nd0m'

export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
}

export const authToken = (req, res, next) => {
    const token = req.headers.auth
    if (!token) return res.status(401).json({ error: 'invalid'})
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {

    })
}
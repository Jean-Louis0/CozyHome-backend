import jwt from 'jsonwebtoken'

const jwtSecret = process.env.SECRET_KEY

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({message: 'Unauthorized' })
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if(err) {
            return res.status(403).json({message: 'Forbidden' })
        }
        req.user = user
        next()
    })
}

export default authenticateToken
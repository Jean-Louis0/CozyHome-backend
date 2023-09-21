import jwt from 'jsonwebtoken'


const jwtSecret = process.env.SECRET_KEY

const createToken = (adminId, username) => {
    return jwt.sign({ adminId, username }, jwtSecret)
}

export default createToken

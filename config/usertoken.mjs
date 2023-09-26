import jwt from 'jsonwebtoken'


const jwtSecret = process.env.SECRET_KEY

const createToken = (adminid, username) => {
    return jwt.sign({ adminid, username }, jwtSecret)
}

export default createToken

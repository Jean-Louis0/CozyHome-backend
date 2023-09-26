import express, { json} from 'express'
import authenticateToken from '../config/Authenticateuser.mjs'
import { registerAdminController, loginAdminController, updateCredentialsController} from '../Controllers/adminController.mjs'

const router = express.Router()

/*--------------------------------- Login for Admin --------------------------------------------*/
router.post('/login', loginAdminController)

/*--------------------------------- Admin Register --------------------------------------------*/
router.post('/register', registerAdminController)

/*--------------------------------- Admin update credentials --------------------------------------------*/
router.put('/update/:adminid', updateCredentialsController)

export default router
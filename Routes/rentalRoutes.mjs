import express, { json } from 'express'
import { createRentalcontroller, viewRentalController, updatedRentalController, viewPropertyRentalsController } from '../Controllers/rentalController.mjs'
import authenticateToken from '../config/Authenticateuser.mjs'

const router = express.Router()

/*-------------------------------- Create a new rental -------------------------------------------------------------*/
router.post('/:propertyid', createRentalcontroller)

/*-------------------------------- view rental details by ID -------------------------------------------------------------*/
router.get('/:rentalid', viewRentalController)

/*-------------------------------- update rental details by rental ID -------------------------------------------------------------*/
router.put('/:rentalid', updatedRentalController)

/*-------------------------------- View all rentals associated with one property for admin --------------------------------*/
router.get('/property/:propertyid', authenticateToken, viewPropertyRentalsController)

export default router

import express, { json} from 'express'
import { getPropertyDetails, getAllProperties, addNewProperty, updatePropertydetails, deletePropertyById, viewPropertyAndRentalDetails } from '../Controllers/propertyController.mjs'
import authenticateToken from '../config/Authenticateuser.mjs'

const router = express.Router()

/*-------------------------------- view all properties -------------------------------------------------------------*/
router.get('/properties', getAllProperties)

/*--------------------------------- View property details by property ID --------------------------------------------*/
router.get('/:propertyid', getPropertyDetails)

/*--------------------------------- Add a property -------------------------------------------------------------*/
router.post('/', authenticateToken, addNewProperty)

/*--------------------------------- Update a property -------------------------------------------------------------*/
router.put('/:propertyid', authenticateToken, updatePropertydetails)

/*--------------------------------- Delete a property -------------------------------------------------------------*/
router.delete('/:propertyid', authenticateToken, deletePropertyById)


/*-------------------------------- View property and rental details -------------------------------------------------------------*/
router.get('/viewpropertyandrentaldetails/:propertyid', authenticateToken, viewPropertyAndRentalDetails)



export default router

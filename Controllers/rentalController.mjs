import {
    createRental,
    viewRental,
    viewPropertyRentals,
    updateRental
} from '../Models/rental.mjs'
import authenticateToken from '../config/Authenticateuser.mjs'

/*---------------------------- create a new rental -----------------------------------------*/

const createRentalcontroller = async(req, res) => {
    try{
        const { propertyid } = req.params
        const { firstname, lastname, telephone, email, fromdate, todate } = req.body

        //create the rental
        const rental = await createRental(firstname, lastname, telephone, email, fromdate, todate, propertyid)

        if (!rental) {
            return res.status(500).json({ message: 'Failed to create rental. Database error.' })
        }

        res.status(201).json({ rental })
    }
    catch(error){
        console.error( 'Error in creating rental:', error )
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*---------------------------- view rental Details -----------------------------------------*/
const viewRentalController = async(req, res) => {
    try{
        const { rentalid } = req.params
        const rental = await viewRental(rentalid)

        if(!rental) {
            return res.status(404).json({ message: 'Rental not found' })
        }
        res.status(200).json({ rental })
    }
    catch(error) {
        console.error('Error in getting rental details: ', error)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

/*---------------------------- view all rental associated with one property -----------------------------------------*/
const viewPropertyRentalsController = async(req, res) => {
    try {
        const { propertyid } = req.params
        // Check authentication token
        const { adminid } = req.user
        const rentals = await viewPropertyRentals(propertyid)

        res.status(200).json({ rentals })
    }
    catch (error) {
        console.error('Error in getting property rentals:', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*---------------------------- update rental details -----------------------------------------*/
const updatedRentalController = async (req, res) => {
    try {
        const { rentalid } = req.params
        const { telephone, email } = req.body
        const updatedRental = await updateRental(rentalid, telephone, email)

        if(!updatedRental){
            return res.status(500).json({ message: 'Failed to update rental' })
        }

            res.status(200).json({ updatedRental, message: 'Booking details updated' })
        }
    catch(error) {
        console.error('Error in updating rental details: ', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export {
    createRentalcontroller,
    viewPropertyRentalsController,
    viewRentalController,
    updatedRentalController
}
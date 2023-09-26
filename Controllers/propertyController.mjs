import { viewProperty, addProperty, updateProperty, deleteProperty } from "../Models/property.mjs"
import authenticateToken from "../config/Authenticateuser.mjs"

/*-------------------------- View property details by property ID -----------------------------*/
const getPropertyDetails = async(req, res) => {
    try {
        const { propertyid } = req.params
        const property = await viewProperty(propertyid)

        if(!property) {
            return res.status(404).json({ message: 'Property not found' })
        }
        res.status(200).json({ property })
    }
    catch(error) {
        console.error('Error in getting property details:', error)
        res.status(500).json({ message: 'internal server error' })
    }
}

/*-------------------------- Add a property -----------------------------*/
const addNewProperty = async(req, res) => {
    try{
        const { location, name, description, price, property_type, number_of_rooms, images } = req.body
        //check authentication token
        const { adminid } = req.user

        //add the property
        const property = await addProperty(location, name, description, price, property_type, number_of_rooms, images)

        if(!property) {
            return res.status(500).json({ message: 'Failed to add property' })
        }
    }
    catch(error){
        console.error('Error in adding property:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*-------------------------- Update a property -----------------------------*/
const updatePropertydetails = async(req, res) => {
    try{
        const { propertyid } = req.params
        const { location, name, description, price, number_of_rooms, images } = req.body

        // check authentication token
        const { adminid } = req.user

        //update the property
        const updatedProperty = await updateProperty(
            name,
            location,
            description, 
            price,
            number_of_rooms,
            images
        )
        if (!updatedProperty) {
            return res.status(500).json({ message: 'Failed to update property' })
        }

        res.status(200).json({ updatedProperty })
    }
    catch (error) {
        console.error('Error in updating property details:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*-------------------------- Delete a property -----------------------------*/
const deletePropertyById = async(req, res) => {
    try {
        const { propertyid } = req.params

        //check authentication token
        const { adminid } =req.user

        //Delete the property
        await deleteProperty(propertyid)

        res.status(204).send()
    }
    catch (error) {
        console.error('Error in deleting property:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export {
    getPropertyDetails,
    addNewProperty,
    updatePropertydetails,
    deletePropertyById
}
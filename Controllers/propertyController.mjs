import { viewProperty, viewAllProperties, addProperty, updateProperty, deleteProperty, viewrentaldetails } from "../Models/property.mjs"
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

/*-------------------------- View all properties -----------------------------*/
const getAllProperties = async (req, res) => {
    try {
        const properties = await viewAllProperties()

        if (!properties) {
            return res.status(404).json({ message: 'No properties found' })
        }

        res.status(200).json({ properties })
    } catch (error) {
        console.error('Error in getting all properties:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

/*-------------------------- Add a property -----------------------------*/
const addNewProperty = async(req, res) => {
    try{
        const { location, name, description, price, property_type, number_of_rooms, images } = req.body
        //check authentication token
        const { adminid } = req.user

        //add the property
        const property = await addProperty(location, name, description, price, adminid, property_type, number_of_rooms, images)

        if(!property) {
            return res.status(500).json({ message: 'Failed to add property' })
        }
        return res.json({ message: 'Added property' })   
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
            propertyid,
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

        res.status(200).json({ updatedProperty, message: 'property updated' });

    }
    catch (error) {
        console.error('Error in updating property details:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


/*-------------------------------------- delete admin's property --------------------------------------*/
const deletePropertyById = async (req, res) => {
    try {
        const { propertyid } = req.params;

        // Check authentication token
        const { adminid } = req.user;

        // Delete the property and related images
        await deleteProperty(propertyid);

        res.status(204).json({ message: 'Property deleted' });
    } catch (error) {
        console.error('Error in deleting property:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

/*-------------------------- View property and rental details -----------------------------*/
const viewPropertyAndRentalDetails = async (req, res) => {
    try {
        // Check authentication token
        const { adminid } = req.user;
        
        const propertiesAndRentalDetails = await viewrentaldetails(adminid);
        
        if (!propertiesAndRentalDetails) {
            return res.status(404).json({ message: 'The property has not yet been rented.' });
        }

        res.status(200).json({ propertiesAndRentalDetails });
    } catch (error) {
        console.error('Error in getting property and rental details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    getPropertyDetails,
    getAllProperties,
    addNewProperty,
    updatePropertydetails,
    deletePropertyById,
    viewPropertyAndRentalDetails
}
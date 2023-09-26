import conn from '../config/DB.mjs'

/*-------------------------------------------------- View property details by property ID ---------------------------------------------------------------------------*/
const viewProperty = async (propertyid) => {
    try {
        const query = 'SELECT (location, name, description, price, property_type, number_of_rooms) FROM property WHERE propertyid = $1'
        const values = [propertyid]
        const result = await conn.query(query, values)

        if (result.rowCount === 1) {
            return result.rows[0]
        } else {
            return null
        }
    }
    catch(error) {
        throw error;
    }
}

/*---------------------------------------------- Add a new property ----------------------------------------------------------------------------------------*/
const addProperty = async(location, name, description, price, adminid, property_type, number_of_rooms, images) => {
    try{
        const propertyquery = 'INSERT INTO property (location, name, description, price, adminid, property_type, number_of_rooms) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING propertyid'
        const propertyvalues = [location, name, description, price, adminid, property_type, number_of_rooms]
        const propertyresult = await conn.query(propertyquery, propertyvalues)
        const propertyid = propertyresult.rows[0].propertyid
        
        //insert property images into propertyimg table
        const imagequery = 'INSERT INTO propertyimg (propertyid, image_data) VALUES ($1, $2);'
        for(const imageData of images) {
            await conn.query(imagequery, [propertyid, imageData])
        }
        if (propertyresult.rowCount === 1) {
            
            return { propertyid }
        }
        else {
            return null
        }
    }

    catch (error){
        throw error
    }
}

/*------------------------------------- update admin's property information -------------------------------------*/
const updateProperty = async(propertyid, location, name, description, price, number_of_rooms, images) => {
    try{
        const updatePropertyquery = `UPDATE property 
            SET
                location = $2,
                name = $3,
                description = $4,
                price = $5,
                number_of_rooms = $6
            WHERE propertyid = $1;`
        const updatePropertyvalues  = [propertyid, location, name, description, price, number_of_rooms]
        const updatePropertyresult = await conn.query(updatePropertyquery, updatePropertyvalues)

        if (updatePropertyresult.rowCount === 0) {
            // Property not found or not updated
            return null;
        }
        const imagequery = `UPDATE propertyimg
            SET image_data = $2 WHERE propertyid = $1;`
            
            for (const imageData of images) {
                await conn.query(imagequery, [propertyid, imageData])
            }
            return { propertyid }
    }
    
    catch(error) {
        throw error
    }
}

/*-------------------------------------- delete admin's property --------------------------------------*/
const deleteProperty = async (propertyid) => {
    try {
        // Delete property images first
        const deleteImageQuery = 'DELETE FROM propertyimg WHERE propertyid = $1;';
        await conn.query(deleteImageQuery, [propertyid]);

        // Then delete the property
        const deletePropertyQuery = 'DELETE FROM property WHERE propertyid = $1;';
        await conn.query(deletePropertyQuery, [propertyid]);
    } catch (error) {
        throw error;
    }
}


/*-------------------------------- view all properties --------------------------------*/
const viewAllProperties = async () => {
    try {
        const query = 'SELECT location, name, description, price, property_type, number_of_rooms FROM property';
        const result = await conn.query(query);

        return result.rows;
    } catch (error) {
        throw error;
    }
}

/*-------------------------------- view property and rental details --------------------------------*/
const viewrentaldetails = async (adminid) => {
    try {
        const query = `
          SELECT p.*, r.firstname, r.lastname, r.telephone, r.email
          FROM property p
          LEFT JOIN rental r ON p.propertyid = r.propertyid
          WHERE p.adminid = $1`;
        const values = [adminid];
        const result = await conn.query(query, values);
    
        return result.rows;
    } 
    catch (error) {
        throw error;
    }
}

export {
    viewProperty,
    addProperty,
    updateProperty,
    deleteProperty,
    viewAllProperties,
    viewrentaldetails
}
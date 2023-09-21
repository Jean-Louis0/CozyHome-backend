import conn from '../db.mjs'

/*--------------------------------Create a rental ------------------------------------*/
const createRental = async(propertyId, firstname, lastname, telephone, email) => {
    try {
        const createRentalQuery = `INSERT INTO 
            rental (firstname, lastname, telephone, email)
            VALUES ($1, $2, $3, $4, $5, $6);`;
        const rentalValues = [firstname, lastname, telephone, email];
        const result = await conn.query(createRentalQuery, rentalValues);
    
        return result.rows[0].rentalid;
    } 
    catch (error) {
        throw error;
    }
}

/*-------------------------------- view rentals with associated property information ------------------------------------*/
const viewRental = async(rentalid) => {
    try {
        const viewRentalquery = `SELECT 
                r.firstname, 
                r.lastname,
                r.telephone,
                r.email,
                p.name,
                p.description
                p.location
                p.price
                p.number_of_rooms
            FROM 
                rental r 
                INNER JOIN property p 
            ON 
                r.propertyid = p.propertyid
            WHERE 
                r.rentalid = $1;`
        const viewRentalvalues =  [rentalid]
        const result = await conn.query(viewRentalquery, viewRentalvalues)

        if (result.rowCount === 1) {
            return result.rows[0]
        }else {
            return null
        }
    }
    catch (error) {
        throw error
    }
}

/*--------------------- view all rental associated with one property (for admin) ---------------------*/
const viewPropertyRentals = async(propertyid) => {
    try {
        const viewPropertyRentalsquery = `SELECT 
                firstname,
                lastname,
                telephone,
                email
            FROM rental
            WHERE propertyid = $1;`
        const viewPropertyRentalsvalues = [propertyid]
        const viewPropertyRentalsresult = await conn.query(query, values)
        
        return result.rows
    }
    catch (error) {
        throw error
    }
}

/*--------------------- update rental details ---------------------*/
const updateRental = async(telephone, email) => {
    try {
        const updateRentalquery = `UPDATE rental
            SET 
                telephone =$1,
                email = $2
            WHERE rentalid = $1;`
        const updateRentalvalues = [telephone, email]
        await conn.query(updateRetalquery, updateRentalvalues)
    }
    catch(error) {
        throw error
    }
}



/*-------------------------- Export ----------------------------*/

export {
    createRental,
    viewPropertyRentals,
    viewRental,
    updateRental
}
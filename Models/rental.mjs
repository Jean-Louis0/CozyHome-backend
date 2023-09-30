import conn from '../config/DB.mjs'

/*--------------------------------Create a rental ------------------------------------*/
const createRental = async(firstname, lastname, telephone, email, fromdate, todate, propertyid) => {
    try {
        const createRentalQuery = `INSERT INTO 
            rental (firstname, lastname, telephone, email, fromdate, todate, propertyid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING rentalid;`
        const rentalValues = [firstname, lastname, telephone, email, fromdate, todate, propertyid]
        const result = await conn.query(createRentalQuery, rentalValues)
    
        return result.rows[0]
    } 
    catch (error) {
        console.error('Error creating rental:', error)
        throw error
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
                p.description,
                p.location,
                p.price,
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
        const viewPropertyRentalsresult = await conn.query(viewPropertyRentalsquery, viewPropertyRentalsvalues)
        
        return viewPropertyRentalsresult.rows
    }
    catch (error) {
        throw error
    }
}

/*--------------------- update rental details ---------------------*/
const updateRental = async(rentalid, telephone, email) => {
    try {
        const updateRentalquery = `UPDATE rental
            SET 
                telephone =$2,
                email = $3
            WHERE rentalid = $1
            RETURNING *;`
        const updateRentalvalues = [rentalid, telephone, email]
        const result = await conn.query(updateRentalquery, updateRentalvalues)

        if (result.rowCount === 1) {
            return result.rows[0]
        } else {
            return null
        }
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
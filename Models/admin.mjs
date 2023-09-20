import conn from '../config/DB.mjs'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.SECRET_Key

const createToken = (adminId, username) => {
    return jwt.sign({ adminId, username }, jwtSecret)
}


/*-------------------------------- login and return a jwt token --------------------------------*/
const loginAdmin = async(username, password) => {
    try{
        const query = 'select * FROM admin WHERE username = $1 AND password = $2'
        const values = [username, password]
        const result = await conn.query(query, values)

        if (result.rowCount === 1){
            const admin  = result.rows[0]
            const token = createToken(admin.adminId, admin.username)
            return { admin, token }
        }
        else {
            return null
        }
    }
    catch (error){
        throw error
    }
}


/*-------------------------------- register a new admin --------------------------------*/
const registerAdmin = async(username, password, email, telephone) => {
    try{
        const query = 'INSERT INTO admin (username, password, email, telephone) VALUES ($1, $2, $3, $4)RETURNING *'
        const values = [username, password, email, telephone]
        const result = await conn.query(query, values)
        
        if(result.rowCount === 1) {
            const admin = result.rows[0]
            return admin
        }
        else{
            return null
        }
    }

    catch (error) {
        throw error
    }
}

/*-------------------------------- list a new property --------------------------------*/
const listProperty = async(location, name, description, price, property_type, number_of_rooms) => {
    try{
        const query = 'INSERT INTO property (location, name, description, price, property_type, number_of_rooms) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        const values = [location, name, description, price, property_type, number_of_rooms]
        const result = await conn.query(query, values)

        if (result.rowCount === 1) {
            const property = result.rows[0]
            return property
        }
        else{
            return null
        }
    }

    catch (error){
        throw error
    }
}

/*-------------------------------- view properties and rental details --------------------------------*/
const adminproperties = async(adminid) => {
    try{
        const query = `SELECT 
        p.location AS property_address, 
        p.name AS property_name, 
        p.description AS property_description, 
        p.price AS Price_per_night, 
        p.property_type AS property_type, 
        p. number_of_rooms AS number_of_rooms,
        r.firstname AS renter_firstname,
        r.lastname AS renter_lastname,
        r.telephone AS renter_telephone,
        r.email AS renter_email,
        r.fromdate AS startdate,
        r.todate AS enddate
      FROM property p
      LEFT JOIN rental r ON p.propertyid = r.propertyid
      WHERE p.adminid = $1;
    `
    const values = [adminid]
    const result = await conn.query(query, values)

    return result.rows
    }

    catch(error) {
        throw error
    }
}
/*-------------------------------- update admin's property information --------------------------------*/
const updateProperty = async(propertyid, location, name, description, price, number_of_rooms) => {
    try{
        const query = `UPDATE property 
            SET
                location = $2,
                name = $3,
                description = $4,
                price = $5,
                number_of_rooms =$6
            WHERE propertyid = $1'
            RETURNING *;`
        const values  = [propertyid, location, name, description, price, number_of_rooms]
        const result = await conn.query(query, values)

        if (result.rowCount === 1) {
            const property = result.rows[0]
            return property
        } 
        else {
            return null
        }
    }

    catch(error) {
        throw error
    }
}

/*-------------------------------- update credentials --------------------------------*/
const updateAdminCredentials = async(adminid, password, email, telephone) => {
    try {
        const query = `UPDATE admin
            SET
                password = $2,
                email = $3,
                telephone = $4
            WHERE adminid = $1
            RETURNING *
        `
        const values = [adminid, password, email, telephone]
        const result = await conn.query(query, values)

        if(result.rowCount === 1) {
            const admin = result.rows[0]
            return admin
        }
        else {
            return null
        }
    }
    catch (error) {
        throw error;
    }
}

/*-------------------------------- delete property --------------------------------*/
const deleteproperty = async(propertyid) => {
    try {
        const query = 'DELETE FROM property WHERE propertyid = $1'
        const values = [propertyid]
        await conn.query(query, values)
    }
    catch (error) {
        throw error
    }
}

/*-------------------------------- export --------------------------------*/

export {
    loginAdmin, 
    registerAdmin, 
    listProperty, 
    adminproperties, 
    updateProperty, 
    updateAdminCredentials, 
    deleteproperty
}
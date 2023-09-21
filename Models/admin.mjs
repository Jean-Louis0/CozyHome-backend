import conn from '../config/DB.mjs'

/*-------------------------------- login and return a jwt token --------------------------------*/
const loginAdmin = async(username, password) => {
    try{
        const query = 'select * FROM admin WHERE username = $1 AND password = $2'
        const values = [username, password]
        const result = await conn.query(query, values)

        if (result.rowCount === 1){
            const admin  = result.rows[0]
            return { admin }
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


/*-------------------------------- export --------------------------------*/

export {
    loginAdmin, 
    registerAdmin, 
    updateAdminCredentials, 
}
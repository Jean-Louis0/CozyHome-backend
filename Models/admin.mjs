import conn from '../config/DB.mjs'

/*-------------------------------- login and return a jwt token --------------------------------*/
const loginAdmin = async (email, password) => {
    try {
        const query = 'SELECT * FROM admin WHERE email = $1';
        const values = [email];
        console.log('SQL Query:', query);
        console.log('SQL Values:', values);

        const result = await conn.query(query, values)

        if (result.rowCount === 1){
            return result.rows[0]
        }
        else {
            return null
        }
    }
    catch (error){
        throw error
    }
}


/*-------------------------------- Find an Admin by email --------------------------------*/
const findAdminbyemail = async (email) => {
    try {
        const findAdminbyemailquery = 'SELECT * FROM admin WHERE email = $1'
        const findAdminbyemailvalues =  [email]
        const result = await conn.query(findAdminbyemailquery, findAdminbyemailvalues)

        if(result.rowCount === 1) {
            return result.rows[0]
        }
        else {
            return null
        }
    }
    catch (error) {
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
    findAdminbyemail,
    registerAdmin, 
    updateAdminCredentials, 
}
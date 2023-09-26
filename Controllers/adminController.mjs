import bcrypt from 'bcrypt'
import { loginAdmin, registerAdmin, findAdminbyemail, updateAdminCredentials} from '../Models/admin.mjs'
import createToken from '../config/usertoken.mjs'
import authenticateToken from '../config/Authenticateuser.mjs'

/*----------------------- to register admin ---------------------------------------------*/
const registerAdminController = async(req, res) => {
    try {
        const { username, password, email, telephone } = req.body

        //check if email is already taken
        const existingAdmin = await findAdminbyemail(email)

        if(existingAdmin) {
            return res.status(400).json({ message: 'Email is already used' })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 20)

        //create a new admin
        const admin = await registerAdmin(username, hashedPassword, email, telephone)

        if(!admin) {
            return res.status(500).json({ message: 'Failed to register admin' })
        }

        //create and return a JWT token for the new admin
        const token = createToken(admin.adminid, admin.username)
        res.status(201).json({ admin, token })
    }
    catch (error) {
        console.error('Error in admin registration:', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*--------------------------------- to login for admin ---------------------------------------------------*/
const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add a log statement to verify the input data
        console.log('Received login request for username:', email);

        // Add a log statement to verify the password variable
        console.log('Received password:', password);

        // Find the admin using the loginAdmin function
        const admin = await loginAdmin(email, password);

        // Add a log statement to verify the result from the database query
        console.log('Result from database query:', admin);
        
        // Add a log statement to verify the result from the loginAdmin function
        console.log('Result from loginAdmin function:', admin)

        if (!admin) {
            console.log(`Login failed for email: ${email}, Invalid credentials`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Retrieved admin from the database:', admin);

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);

        console.log('Password Match:', passwordMatch);

        if (!passwordMatch) {
            console.log(`Login failed for username: ${email}, Passwords don't match`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Passwords match, create and return a JWT token for the admin
        const token = createToken(admin.adminid, admin.email);
        res.status(200).json({ admin, token });
    } catch (error) {
        console.error('Error in admin login:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
};



/*------------------------------------- Update admin credentials -------------------------------------*/
const updateCredentialsController = async (req, res) => {
    try {
        const { adminid } = req.params
        const { password, email, telephone } = req.body

        //hash the new password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 20): undefined

        //update the admin's credentials
        const admin = await updateAdminCredentials(adminid, hashedPassword, email, telephone)

        if(!admin) {
            return res.status(500).json({ message: 'Failed to update admin credentials '})
        }
        res.status(200).json({ message: 'Credentials updated successfully' })
    }
    catch(error) {
        console.error('error in updating admin credentials', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


/*--------------------------------------- Apply authenticateToken middleware to protect the updateCredentials route -----------------------------------------*/
const updateCredentialsProtected = [authenticateToken, updateCredentialsController]


/*--------------------------------------- export admin controller functions ---------------------------------------------*/
export {
    registerAdminController,
    loginAdminController,
    updateCredentialsProtected as updateCredentialsController
}
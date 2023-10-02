# CozyHome-backend

### Under Construction ...
 
## CozyHome API Documentation
Welcome to CozyHome Documentation!🏡

CozyHome is your ultimate solution for all things property management and rental. 
Whether you're a property owner looking to manage your rentals efficiently or a tenant in search of the perfect house or appartment, 
We have got you covered at CozyHome.

#### Why CozyHome?
CozyHome acts as a bridge, connecting eager travelers, with welcoming hosts.
For clients, finding the ideal home-away-from-home is just a click away. 
For owners, managing properties and maximizing revenue has never been more straightforward.

### Deployment
The live deployment of this API is on the following URL: https://cozyhome.onrender.com/


### Start The Journey!!

1. clone this repository to your local machine.
       Open your terminal or cmd and run: 
       ```git clone https://github.com/your-username/CozyHome.git```

2. Navigate to the project directory using the `cd` command:
      ```cd CozyHome-backend```

3. Install the required dependencies. (Make sure you have Node.js and npm (Node Package Manager) installed. If you don't have them, you can download and install them from nodejs.org)
     then run:
      ```npm install```

4. Once you have installed all the dependencies; then run:
      ```npm run dev```
    This will start the development server, and you should see output indicating that the server is running. 
You can now access CozyHome in your browser at http://localhost:3200.

### Contact
Are you encountering issues? or do you want to give us some advice?
 Feel free to reach out to us via our linkedin accounts: 
  https://www.linkedin.com/in/largoleslie/ or https://www.linkedin.com/in/jean-louis-girishaka/
### ----------------------------------------------------------------------------------------------------------------------- ###
## Let's explore it 🚀🔍💻!!

### Routes

1. For clients

     To rent a property (post request, the user will have to add: firstname, lastname, telephone, email, check-in, check-out dates)
       rental/:propertyid 

      To view the booking details(Get request)
        rental/:rentalid

      To update the booking details(put request, user can only update: the telephone and the email)
        rental/:rentalid
       To view all properties (Get)
         /property/properties
   
2. For Host

        To view property details by property id (Get)
          property/:propertyid (1,12, 16, 17, 10)

        To add a property (post: requires a token) 
          /property

         To update a property (post: requires a token) 
           /property/:propertyid 

          To delete a property (post: requires a token) 
            /property/:propertyid

          To view rental details associated to property details (post: requires a token) 
             /viewpropertyandrentaldetails/:propertyid

          To login for admin, requires a token(post)
             /admin/login

          To register for admin, requires a token(post)
             /admin/register

          To update admin credentials, requires a token(post)
             /update/:adminid

           to view bookings associated with one property (get request for admin, requires a token)
              rental/property/:propertyid

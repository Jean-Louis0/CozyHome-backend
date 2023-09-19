import pkg from 'pg'
import dotenv from 'dotenv'


dotenv.config()
// Create a PostgreSQL connection pool
const { Client } = pkg

let clientconfig = {
    database: 'CozyHome',
    host: 'localhost',
    port: 5432,
    user: 'girishakapsql',
    password: process.env.PASSWORD_POSTGRESQL
}

const conn = new Client(clientconfig)

// Connect to the PostgreSQL database
conn.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });


export default conn

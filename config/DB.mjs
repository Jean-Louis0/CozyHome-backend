import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a PostgreSQL connection pool
const { Client } = pkg;

const clientconfig = {
  database: 'cozy_home',
  host: 'dpg-ckaj3vcg66mc7382oghg-a.oregon-postgres.render.com',
  port: 5432,
  user: 'girishakapsql',
  password: process.env.PASSWORD_POSTGRESQL
}


// Create the PostgreSQL connection URL
const connectionString = `postgres://${clientconfig.user}:${clientconfig.password}@${clientconfig.host}:${clientconfig.port}/${clientconfig.database}?ssl=true`;

// Create a new PostgreSQL client with the connection URL
const conn = new Client({
    connectionString: connectionString
});

// Connect to the PostgreSQL database
conn.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
    });

export default conn;

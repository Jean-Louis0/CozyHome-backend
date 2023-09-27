import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a PostgreSQL connection pool
const { Client } = pkg;

const clientconfig = {
    database: 'CozyHome',
    host: 'localhost',
    port: 5432,
    user: 'girishakapsql',
    password: process.env.PASSWORD_POSTGRESQL
};

// Create the PostgreSQL connection URL
const connectionString = `postgres://${clientconfig.user}:${clientconfig.password}@${clientconfig.host}:${clientconfig.port}/${clientconfig.database}`;

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

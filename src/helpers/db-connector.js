import { Pool } from 'pg';
let pool; // Declare the pool outside of the try-catch block

try {
    /* pool = new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }); */
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            require: true,
            rejectUnauthorized: false,  // ⭐ THIS FIXES IT
        },
    });


    pool.on('connect', () => {
        console.log("Postgre Database Connected.");
    });
} catch (error) {
    console.log('Error connecting to the database:', error);
}

export default pool;

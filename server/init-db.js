const pool = require('./db');

const initializeDatabase = async () => {
    try {
        const createTableQuery = require('fs').readFileSync('./sql/create_tables.sql', 'utf8');
        await pool.query(createTableQuery);
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

initializeDatabase().catch(() => process.exit(1));

const pool = require('../db');

const getAll = async () => { // executes a query to get all contacts
    const result = await pool.query('SELECT * FROM contacts');
    return result.rows;
};

const create = async ({ name, phone, description }) => {// executes a query to create a new contact
    const result = await pool.query(
        'INSERT INTO contacts (name, phone, description) VALUES ($1, $2, $3) RETURNING *',
        [name, phone, description]
    );
    return result.rows[0];
};

const updateById = async (id, { name, phone, description }) => { // executes a query to update a contact by id
    const result = await pool.query(
        'UPDATE contacts SET name = $1, phone = $2, description = $3 WHERE id = $4 RETURNING *',
        [name, phone, description, id]
    );
    return result;
};

const deleteById = async (id) => { // executes a query to delete a contact by id
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
    return result;
};

module.exports = {
    getAll,
    create,
    updateById,
    deleteById,
};

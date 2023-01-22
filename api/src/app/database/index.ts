const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'magazinereader',
});

client.connect();

export async function query(query: string, values: any) {
    const { rows } = await client.query(query, values);
    return rows;
}
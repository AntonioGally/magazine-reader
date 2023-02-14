const { Client } = require('pg');

const isLocal =
    process.env.LOCAL_DEVELOPMENT === "false" ? false : true || false;
const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
});


client.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

export async function query(query: string, values: any) {
    const { rows } = await client.query(query, values);
    return rows;
}
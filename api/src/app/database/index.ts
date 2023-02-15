const { Client } = require('pg');

const isLocal =
    process.env.LOCAL_DEVELOPMENT === "false" ? false : true || false;
const client = new Client({
    host: String(process.env.POSTGRES_HOST),
    port: process.env.POSTGRES_PORT,
    user: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DATABASE),
    ...(isLocal ? { ssl: false } : {
        ssl: {
            rejectUnauthorized: false,
        },
    }),
});


client.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

export async function query(query: string, values: any) {
    const { rows } = await client.query(query, values);
    return rows;
}
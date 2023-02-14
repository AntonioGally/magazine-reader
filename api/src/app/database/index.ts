const { Client } = require('pg');

const isLocal =
    process.env.LOCAL_DEVELOPMENT === "false" ? false : true || false;
console.log(process.env.POSTGRES_HOST)
const client = new Client({
    host: "localhost",
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'magazinereader',
});


client.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

export async function query(query: string, values: any) {
    const { rows } = await client.query(query, values);
    return rows;
}
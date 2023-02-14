const { Client } = require('pg');

const isLocal =
    process.env.LOCAL_DEVELOPMENT === "false" ? false : true || false;

let client;
if (isLocal) {
    client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: 'root',
        database: 'magazinereader',
    });
} else {
    client = new Client({
        host: "ec2-3-217-251-77.compute-1.amazonaws.com",
        port: 5432,
        user: "qendnwqtwpkttj",
        password: process.env.POSTGRES_SECRET,
        database: "d90k3g0im7k88m",
        ssl: {
            rejectUnauthorized: false,
        },
    });
}


client.connect(function (err) {
    if (err) console.log(err);
    else console.log("Connected!");
});

export async function query(query: string, values: any) {
    const { rows } = await client.query(query, values);
    return rows;
}
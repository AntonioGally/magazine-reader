// import { config } from "dotenv";
require('dotenv').config()
import express from "express"
import "express-async-errors";
// import { router } from "./routes";
import { router } from "./Router/Router";
// config();
const app = express();
import cors from "cors";

app.use(cors())

app.use(express.json());
app.use(router);

app.use((error, request, response, next) => {
    console.log('ERROR HANDLER ##############################');
    console.log(error);
    response.sendStatus(500);
});

app.listen(process.env.PORT || 8080, () => console.log('Server started'));
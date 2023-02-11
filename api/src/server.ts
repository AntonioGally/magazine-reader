import { ErrorRequestHandler, NextFunction, RequestHandler, Response } from "express";

require("dotenv").config();
const express = require('express');
require('express-async-errors');
const routes = require('./routes');
const app = express();
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(routes);

app.use((error: ErrorRequestHandler, request: RequestHandler, response: Response, next: NextFunction) => {
    console.log('ERROR HANDLER ##############################');
    console.log(error);
    response.sendStatus(500);
});

app.listen(8080, () => console.log('Server started at http://localhost:8080'));
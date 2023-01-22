//Libs
import { sign, verify } from "jsonwebtoken";
//Types
import { NextFunction, Request, Response } from "express";
import { LoginPayload } from "./auth.types";
//Flows
import LoginValidator from "./flows/Validators/Login/LoginValidator";

class Auth {

    login(request: Request<any, any, LoginPayload>, response: Response) {
        const { email, password } = request.body;

        if (!new LoginValidator(email, password).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }
        const user = { email }
        const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET);
        return response.status(200).json({ accessToken });
    }

    authenticateToken(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers["x-token"] as string;
        let token = authHeader && authHeader;

        if (token == null) {
            return response.sendStatus(401);
        }

        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return response.sendStatus(403); //token no longer valid
            next();
        })
    }

}

export default new Auth();
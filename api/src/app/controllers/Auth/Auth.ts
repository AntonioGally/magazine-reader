//Libs
import { sign, verify } from "jsonwebtoken";
//Types
import { NextFunction, Request, Response } from "express";
import { LoginPayload, SignUpPayload } from "./auth.types";
//Flows
import LoginValidator from "./flows/Validators/FormLogin/LoginValidator";
import UserValidator from "./flows/Validators/User/UserValidator";
import FormSignUpValidator from "./flows/Validators/FormSignUp/FormSignUpValidator";
import SignUpCreator from "./flows/SignUpCreator/SignUpCreator";

class Auth {

    async login(request: Request<any, any, LoginPayload>, response: Response) {
        const { email, password } = request.body;

        if (!new LoginValidator(email, password).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }

        const dataBaseUser = await new UserValidator(email, password).start();
        if (dataBaseUser.length === 0) {
            return response.status(400).json({ error: "Verify email and password" })
        }

        const user = { email }
        const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET);
        return response.status(200).json({ accessToken, ...dataBaseUser[0] });
    }

    async signUp(request: Request<any, any, SignUpPayload>, response: Response) {
        const signUpPayload = request.body;

        if (!new FormSignUpValidator(signUpPayload).start()) {
            return response.status(400).json({ error: "Verify the inputs sended" })
        }

        const newUser = await new SignUpCreator(signUpPayload).start();
        if (!newUser) {
            return response.status(500).json({ error: "Error on database creation user process" })
        }
        return response.status(200).json(newUser[0])
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
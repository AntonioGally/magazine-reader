import { Request, Response } from "express";
import EditUser from "./Flows/EditUser/EditUser";
import GetUserFlow from "./Flows/GetUser/GetUserFlow";
import { editUserPayload } from "./user.types";

class User {

    async getUser(request: Request<any, any, any>, response: Response) {
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        const [userInfo] = await new GetUserFlow(userId).start();

        if (!userInfo) {
            return response.status(500).json({ error: "Error on get user info process" });
        }

        return response.status(200).json(userInfo);
    }

    async editUser(request: Request<any, any, editUserPayload>, response: Response) {
        //TODO: if it's the same email, doesn't change it on DB
        //TODO: you're not suppose to send the user password! 


        // const userId = request.headers["x-userid"];
        // if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        // const [editedUser] = await new EditUser(response, request.body, userId).start();
        // if (!editedUser) return response.status(500).json({ error: "Error on updating user" });
        
        // return response.status(200).json(editedUser);
    }

}

export default new User();
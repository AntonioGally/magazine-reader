import { Request, Response } from "express";
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
        const userId = request.headers["x-userid"];
        if (typeof userId !== "string") return response.status(400).json({ error: "user id needed" });

        
    }

}

export default new User();
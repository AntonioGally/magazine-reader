import { Response } from "express";
import { editUserPayload } from "../../user.types";
import GetUserFlow from "../GetUser/GetUserFlow";
import BuildQuery from "./Executors/BuildQuery";
import QueryDispatcher from "./Executors/QueryDispatcher";
import VerifyUsersEmail from "./Executors/VerifyUsersEmail";

export default class EditUser {
    constructor(
        private response: Response,
        private payload: editUserPayload,
        private userId: string
    ) { }

    async start() {
        const [userInfo] = await new GetUserFlow(this.userId).start();
        if (!userInfo) return this.response.status(400).json({ error: "user doesn't exists" });

        const [emailOnUse] = await new VerifyUsersEmail(this.payload.email).execute();
        if (emailOnUse) return this.response.status(400).json({ error: "EMAIL_ON_USE" });

        let query = new BuildQuery().execute();
        return new QueryDispatcher(this.payload, this.userId, query).execute();
    }
}
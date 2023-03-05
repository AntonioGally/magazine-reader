import { query } from "../../../../../database";

export default class VerifyUsersEmail {
    constructor(
        private userEmail: string
    ) { }

    execute() {
        return query("SELECT * FROM users WHERE userEmail = $1", [this.userEmail])
    }
}
import { query } from "../../../../../../database";

export default class UserDispatcher {
    constructor(
        private query: string,
        private email: string,
        private password: string
    ) { }

    execute() {
        return query(this.query, [this.email, this.password]);
    }
}
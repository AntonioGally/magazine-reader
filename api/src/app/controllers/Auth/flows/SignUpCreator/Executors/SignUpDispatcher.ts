import { query } from "../../../../../database";
import { SignUpPayload } from "../../../auth.types";

export default class SignUpDispatcher {
    constructor(
        private signUpPayload: SignUpPayload,
        private query: string
    ) { }

    execute() {
        return query(this.query, [
            this.signUpPayload.name,
            this.signUpPayload.lastName,
            this.signUpPayload.email,
            this.signUpPayload.password,
            this.signUpPayload.creationDate
        ])
    }
}
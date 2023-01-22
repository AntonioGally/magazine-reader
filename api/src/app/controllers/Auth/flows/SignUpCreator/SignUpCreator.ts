import { SignUpPayload } from "../../auth.types";
import BuildQuery from "./Executors/BuildQuery";
import SignUpDispatcher from "./Executors/SignUpDispatcher";

export default class SignUpCreator {
    constructor(
        private signUpPayload: SignUpPayload
    ) { }

    start() {
        let query = new BuildQuery().execute();
        return new SignUpDispatcher(this.signUpPayload, query).execute();
    }
}
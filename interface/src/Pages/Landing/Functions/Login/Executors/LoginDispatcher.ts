import authHttp from "../../../../../scripts/authHttp";
import { loginResponse } from "../login.types";

export default class LoginDispatcher {
    constructor(
        private email: string,
        private password: string
    ) { }

    execute() {
        return new Promise<loginResponse>((resolve, reject) => {
            authHttp.post("/login", { email: this.email, password: this.password })
                .then((data) => data.data)
                .catch(reject)
        })
    }
}
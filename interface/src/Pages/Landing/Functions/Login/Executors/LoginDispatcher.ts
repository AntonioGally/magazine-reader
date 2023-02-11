import http from "../../../../../scripts/http";
import { userInfoType } from "../../../../../store/user/user.types";

export default class LoginDispatcher {
    constructor(
        private email: string,
        private password: string
    ) { }

    execute() {
        return new Promise<userInfoType>((resolve, reject) => {
            http.post("/login", { email: this.email, password: this.password })
                .then((data) => resolve(data.data))
                .catch(reject)
        })
    }
}
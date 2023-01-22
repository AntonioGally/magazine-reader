import UserDispatcher from "./Executors/UserDispatcher"

export default class UserValidator {
    constructor (
        private email: string,
        private password: string
    ) {}

    start() {
        let query = "SELECT * FROM users WHERE userEmail = $1 AND userPassword = crypt($2, userPassword)"
        return new UserDispatcher(query, this.email, this.password).execute();
    }
}
import { toast } from "react-toastify";

import LoginDispatcher from "./Executors/LoginDispatcher";

export default class Login {
    constructor(
        private email: string,
        private password: string
    ) { }

    async start() {
        const { accessToken } = await new LoginDispatcher(this.email, this.password).execute();
        if (!accessToken) return toast.error("Verifique Login e senha");

    }
}
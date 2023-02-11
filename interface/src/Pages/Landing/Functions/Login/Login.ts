import { toast } from "react-toastify";
import store from "../../../../store/store";
import { setUser } from "../../../../store/user/user.action";

import LoginDispatcher from "./Executors/LoginDispatcher";

export default class Login {
    constructor(
        private email: string,
        private password: string
    ) { }

    async start() {
        const dispatch = store.dispatch;
        const user = await new LoginDispatcher(this.email, this.password).execute();
        if (!user) return toast.error("Verifique Login e senha");
        localStorage.setItem("user_token", user.accessToken);
        localStorage.setItem("user_id", user.userid);
        dispatch(setUser(user));
    }
}
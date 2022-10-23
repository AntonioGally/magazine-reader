import React, { useState } from "react";
//Components
import Button from "../../Components/Button/Button";
import Login from "../../Modals/Login/Login";
//Css
import style from "./Landing.module.css";

const Landing: React.FC = () => {
    const [loginModal, setLoginModal] = useState<boolean>(false);
    function handleLogin() {
        setLoginModal(true);
    }

    return (
        <>
            <div className={style["wrapper"]}>
                <div className={style["header"]}>
                    <div>
                        <Button label={"Criar conta"} _type={"secondary"} />
                        <Button label={"Entrar"} _type={"primary"} onClick={handleLogin} />
                    </div>
                </div>
                <div className={style["body"]}></div>
            </div>
            {loginModal && (
                <Login visible={loginModal} closeModal={() => setLoginModal(false)} />
            )}
        </>
    )
}

export default Landing;
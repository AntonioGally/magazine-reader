import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Button from "../../Components/Button/Button";
import Login from "../../Modals/Login/Login";
//Css
import style from "./Landing.module.css";

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState<boolean>(false);

    const handleLogin = useCallback((email: string, password: string) => {
        navigate("/main");
    }, [])

    return (
        <>
            <div className={style["wrapper"]}>
                <div className={style["header"]}>
                    <div>
                        <Button label={"Criar conta"} _type={"secondary"} />
                        <Button label={"Entrar"} _type={"primary"} onClick={() => setLoginModal(true)} />
                    </div>
                </div>
                <div className={style["body"]}></div>
            </div>
            {loginModal && (
                <Login visible={loginModal} closeModal={() => setLoginModal(false)} handleLogin={handleLogin} />
            )}
        </>
    )
}

export default Landing;
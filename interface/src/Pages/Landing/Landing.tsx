import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Button from "../../Components/Button/Button";
import LoginModal from "../../Modals/Login/Login";
import SignUpModal from "../../Modals/SignUp/SignUp";
import Login from "./Functions/Login/Login";

//Css
import style from "./Landing.module.css";

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [signUpModal, setSignUpModal] = useState<boolean>(false);

    function handleLogin(email: string, password: string) {
        new Login(email, password).start()
            .then(() => {
                navigate("/magazines");
            })
    }

    const handleRegister = useCallback(
        (name: string, middleName: string, email: string, password: string, confirmPassword: string) => {
            navigate("/magazines");
        }, []);

    return (
        <>
            <div className={style["wrapper"]}>
                <div className={style["header"]}>
                    <div>
                        <Button label={"Criar conta"} _type={"secondary"} onClick={() => setSignUpModal(true)} />
                        <Button label={"Entrar"} _type={"primary"} onClick={() => setLoginModal(true)} />
                    </div>
                </div>
                <div className={style["body"]}></div>
            </div>
            {loginModal && (
                <LoginModal visible={loginModal} closeModal={() => setLoginModal(false)} handleLogin={handleLogin} />
            )}
            {signUpModal && (
                <SignUpModal visible={signUpModal} closeModal={() => setSignUpModal(false)} handleRegister={handleRegister} />
            )}
        </>
    )
}

export default Landing;
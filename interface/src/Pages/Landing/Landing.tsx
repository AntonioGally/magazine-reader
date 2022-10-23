import React from "react";
//Components
import Button from "../../Components/Button/Button";
//Css
import style from "./Landing.module.css";

const Landing: React.FC = () => {
    return (
        <div className={style["wrapper"]}>
            <div className={style["header"]}>
                <div>
                    <Button label={"Criar conta"} _type={"secondary"} />
                    <Button label={"Entrar"} _type={"primary"} />
                </div>
            </div>
            <div className={style["body"]}></div>
        </div>
    )
}

export default Landing;
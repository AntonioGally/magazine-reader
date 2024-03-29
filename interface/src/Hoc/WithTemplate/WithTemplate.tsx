//Libs
import React from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../Components/Button/Button";
//Css
import style from "./WithTemplate.module.css";

interface Props {
    children: JSX.Element
}

type titleMapType = {
    [key: string]: string;
}

const WithTemplate: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const titleMap: titleMapType = {
        "/magazines": "Revistas cadastradas",
        "/editions": "Edições cadastradas",
        "/new-editions": "Novas edições",
        "/profile": "Perfil",
        "/documentation": "Documentação"
    }

    function handleLogOut() {
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_token");
        navigate("/");
    }

    return (
        <div className={style["template-wrapper"]}>
            <div className={style["sidebar"]}>
                <div className={style["sidebar-header"]}></div>
                <div className={`${style["sidebar-link"]} ${location.pathname === "/magazines" ? style["active"] : ""}`}
                    onClick={() => navigate("/magazines")}>
                    <span>Revistas cadastradas</span>
                </div>
                <div className={`${style["sidebar-link"]} ${location.pathname === "/editions" ? style["active"] : ""}`}
                    onClick={() => navigate("/editions")}>
                    <span>Edições cadastradas</span>
                </div>
                <div className={`${style["sidebar-link"]} ${location.pathname === "/new-editions" ? style["active"] : ""}`}
                    onClick={() => navigate("/new-editions")}>
                    <span>Novas edições</span>
                </div>
                <div className={`${style["sidebar-link"]} ${location.pathname === "/profile" ? style["active"] : ""}`}
                    onClick={() => navigate("/profile")}>
                    <span>Perfil</span>
                </div>
                <div className={`${style["sidebar-link"]} ${location.pathname === "/documentation" ? style["active"] : ""}`}
                    onClick={() => navigate("/documentation")}>
                    <span>Documentação</span>
                </div>
            </div>
            <div className={style["content"]}>
                <div className={style["header"]}>
                    <span>
                        {titleMap[location.pathname]}
                    </span>
                    <Button label={"Sair"} _type="primary" onClick={handleLogOut} />
                </div>
                <div className={style["body"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default WithTemplate;
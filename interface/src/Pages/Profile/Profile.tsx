//Libs
import { Col } from "antd";
import React from "react";
import { useQuery } from "react-query";
import Button from "../../Components/Button/Button";
//Components
import Input from "../../Components/Input/Input";
import Label from "../../Components/Label/Label";
import Loading from "../../Components/Loading/Loading";
//Scripts
import authHttp from "../../scripts/authHttp";
import { getFormattedDate } from "../../scripts/utils";
//Css
import style from "./profile.module.css";
import { profile } from "./profile.types";

const Profile: React.FC = () => {

    const userRequest = useQuery<profile>("userData", {
        queryFn: () => authHttp.get("/user").then((res) => res.data)
    })

    if (userRequest.isLoading || !userRequest.data) {
        return <Loading message="Carregando informações" />
    }

    return (
        <div className={style["wrapper"]}>
            <div className={style["col"]}>
                <div>
                    <Label label={"Nome:"} />
                    <Input defaultValue={userRequest.data.username} disabled />
                </div>
                <div>
                    <Label label={"Sobrenome:"} />
                    <Input defaultValue={userRequest.data.userlastname} disabled />
                </div>
                <div>
                    <Label label={"Email:"} />
                    <Input defaultValue={userRequest.data.useremail} disabled />
                </div>
                <div>
                    <Label label={"Data de criação:"} />
                    <Input defaultValue={getFormattedDate(userRequest.data.usercreationdate).dateString} disabled />
                </div>
            </div>
            {/* <Button _type="primary" style={{ width: "fit-content" }} disabled>
                Editar
            </Button> */}
        </div>
    )
}

export default Profile;
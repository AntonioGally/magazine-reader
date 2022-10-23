import React, { useState } from "react";
// Components
import { toast } from "react-toastify";
import Modal from "../../Components/Modal/Modal";
//Elements
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Label from "../../Components/Label/Label";
//Css
import style from "./Login.module.css";

interface Props {
    visible: boolean;
    closeModal: () => void;
    handleLogin: (email: string, password: string) => void;
}

const Login: React.FC<Props> = ({ visible, closeModal, handleLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    function verifyForm() {
        if (formData.email !== "" && formData.password !== "") {
            handleLogin(formData.email, formData.password);
        } else {
            return toast.error("Preencha os campos de email e senha");
        }
    }

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={400}>
            <div className={style["wrapper"]}>
                <div>
                    <Label label={"Email:"} />
                    <Input type={"email"} required placeholder="Ex.: antonio.gally@gmail.com" value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                </div>
                <div>
                    <Label label={"Senha:"} />
                    <Input type="password" value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button label={"Entrar"} _type={"primary"} onClick={verifyForm} />
                </div>
            </div>
        </Modal>
    )
}

export default Login;
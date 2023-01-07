import React from "react";
//Components
import Modal from "../../Components/Modal/Modal";
//Elements
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Label from "../../Components/Label/Label";
//Css
import style from "./SignUp.module.css";

interface Props {
    visible: boolean;
    closeModal: () => void;
    handleRegister: (name: string, middleName: string, email: string,
        password: string, confirmPassword: string) => void;
}

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    middleName: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirmPassword: HTMLInputElement;
}

interface Form extends HTMLFormElement {
    readonly elements: FormElements
}

const SignUp: React.FC<Props> = ({ visible, closeModal, handleRegister }) => {

    function handleSubmit(formEvent: React.FormEvent<Form>) {
        formEvent.preventDefault();
        const data = {
            name: formEvent.currentTarget.elements.name.value,
            middleName: formEvent.currentTarget.elements.middleName.value,
            email: formEvent.currentTarget.elements.email.value,
            password: formEvent.currentTarget.elements.password.value,
            confirmPassword: formEvent.currentTarget.elements.confirmPassword.value,
        }
        handleRegister(data.name, data.middleName, data.email, data.password, data.confirmPassword);
    }

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={400}>
            <form className={style["wrapper"]} onSubmit={handleSubmit}>
                <div>
                    <Label label={"Nome:"} />
                    <Input placeholder="Ex.: Antônio" required name="name" />
                </div>
                <div>
                    <Label label={"Sobrenome:"} />
                    <Input placeholder="Ex.: Gally" required name="middleName" />
                </div>
                <div>
                    <Label label={"Email:"} />
                    <Input placeholder="Ex.: antonio.gally@gmail.com" type={"email"} required name="email" />
                </div>
                <div>
                    <Label label={"Senha:"} />
                    <Input type={"password"} required name="password" />
                </div>
                <div>
                    <Label label={"Confirmar senha:"} />
                    <Input type={"password"} required name="confirmPassword" />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button label={"Cadastrar"} _type={"primary"} />
                </div>
            </form>
        </Modal>
    )
}

export default SignUp;
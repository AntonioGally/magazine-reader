import React from "react";
// Components
import Modal from "../../Components/Modal/Modal";
//Css
import style from "./Login.module.css";

interface Props {
    visible: boolean;
    closeModal: () => void;
}

const Login: React.FC<Props> = ({ visible, closeModal }) => {
    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }}>
            <div className={style["wrapper"]}>
                <div>
                    
                </div>
            </div>
        </Modal>
    )
}

export default Login;
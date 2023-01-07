import React, { useMemo } from "react";
//Components
import Modal from "../../Components/Modal/Modal";
//Elements
import { Tabs } from "antd";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Label from "../../Components/Label/Label";
//Css
import style from "./NewMagazine.module.css";
import Informations from "./Tabs/Informations/Informations";
import Selectors from "./Tabs/Selectors/Selectors";

interface Props {
    visible: boolean;
    closeModal: () => void;
}

const NewMagazine: React.FC<Props> = ({ visible, closeModal }) => {
    function handleSubmit() {

    }

    const getTabs = useMemo(() => {
        return [
            {
                key: "0",
                label: "Informações",
                children: <Informations />
            },
            {
                key: "1",
                label: "Seletores",
                children: <Selectors />
            }
        ]
    }, []);

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={415}>

            <form className={style["wrapper"]} onSubmit={handleSubmit}>
                <Tabs items={getTabs} />
            </form>

        </Modal>
    )
}

export default NewMagazine;
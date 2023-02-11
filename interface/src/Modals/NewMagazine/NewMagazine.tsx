import React, { useMemo } from "react";
//Components
import Modal from "../../Components/Modal/Modal";
import Informations from "./Tabs/Informations/Informations";
import Selectors from "./Tabs/Selectors/Selectors";
import Button from "../../Components/Button/Button";
import { Tabs } from "antd";
//Css
import style from "./NewMagazine.module.css";
//Scripts
import Validator from "./Functions/Validators/Validator";
import { newMagazinePayload } from "./newMagazine.types";

interface Props {
    visible: boolean;
    closeModal: () => void;
}

const NewMagazine: React.FC<Props> = ({ visible, closeModal }) => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //@ts-ignore
        const { title, description, magazineImage, magazineUrl, sitemap, _indexOf } = event.target;
        const payload = ({ name: title, description, magazineImage, magazineUrl, sitemap, _indexOf } as unknown) as newMagazinePayload;
        const validation = new Validator(payload).start();
        if (validation.error) return;
        
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button _type="primary" style={{ margin: "10px 0" }} type="submit">
                        <span>Cadastrar</span>
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export default NewMagazine;
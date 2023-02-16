import React, { useMemo, useState } from "react";
//Components
import Modal from "../../Components/Modal/Modal";
import Informations from "./Tabs/Informations/Informations";
import Selectors from "./Tabs/Selectors/Selectors";
import Button from "../../Components/Button/Button";
import { Spin, Tabs } from "antd";
//Css
import style from "./NewMagazine.module.css";
//Scripts
import Validator from "./Functions/Validators/Validator";
import { newMagazinePayload } from "./newMagazine.types";
import CreateFlow from "./Functions/CreateFlow/CreateFlow";
import { toast } from "react-toastify";
import { generateDate } from "../../scripts/utils";

interface Props {
    visible: boolean;
    closeModal: () => void;
}

const NewMagazine: React.FC<Props> = ({ visible, closeModal }) => {

    const [loading, setLoading] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setLoading(true);
        event.preventDefault();
        //@ts-ignore
        const { title, description, magazineImage, magazineUrl, sitemap, _indexOf } = event.target;
        const payload = ({
            name: title.value,
            description: description.value,
            image: magazineImage.value,
            url: magazineUrl.value,
            creationDate: generateDate(),
            siteMap: sitemap.value,
            indexOf: _indexOf.value
        } as unknown) as newMagazinePayload;
        const validation = new Validator(payload).start();
        if (validation.error) {
            setLoading(false);
            return;
        };
        new CreateFlow(payload).execute()
            .then((data) => {
                toast.success("Revista criada com sucesso!");
            })
            .catch(err => {
                toast.error("Houve algum erro na criação da revista")
            })
            .finally(() => {
                setLoading(false);
            })
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
                    <Spin spinning={loading}>
                        <Button _type="primary" style={{ margin: "10px 0" }} type="submit">
                            <span>Cadastrar</span>
                        </Button>
                    </Spin>
                </div>
            </form>

        </Modal>
    )
}

export default NewMagazine;
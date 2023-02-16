//Libs
import React, { useMemo, useState } from "react";
//Components
import { Modal, Spin, Tabs } from "antd";
import Button from "../../Components/Button/Button";
//Css
import style from "./magazineInfo.module.css";
import { magazineType } from "../../Pages/Magazines/magazines.types";
import Informations from "./Tabs/Informations/Informations";
import Editions from "./Tabs/Editions/Editions";
import { generateDate } from "../../scripts/utils";
import { newMagazinePayload } from "../NewMagazine/newMagazine.types";
import Validator from "../NewMagazine/Functions/Validators/Validator";
import EditFlow from "./Functions/EditFlow/EditFlow";
import { toast } from "react-toastify";

interface Props {
    visible: boolean;
    closeModal: () => void;
    magazineInfo: magazineType
}

const MagazineInfo: React.FC<Props> = ({ visible, closeModal, magazineInfo }) => {

    const [loading, setLoading] = useState(false);

    const getTabs = useMemo(() => {
        return [
            {
                key: "0",
                label: "Informações",
                children: <Informations magazineInfo={magazineInfo} />
            },
            {
                key: "1",
                label: "Edições",
                children: <Editions magazineInfo={magazineInfo} />
            }
        ]
    }, [])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log("entrei")
        setLoading(true);
        event.preventDefault();
        //@ts-ignore
        const { title, description, magazineImage, magazineUrl, sitemap, indexof } = event.target;
        const payload = ({
            name: title.value,
            description: description.value,
            image: magazineImage.value,
            url: magazineUrl.value,
            creationDate: generateDate(),
            siteMap: sitemap.value,
            indexOf: indexof.value
        } as unknown) as newMagazinePayload;
        const validation = new Validator(payload).start();
        if (validation.error) {
            setLoading(false);
            return;
        };
        new EditFlow(payload, magazineInfo.magazineid).start()
            .then((data) => {
                toast.success("Revista editada com sucesso!");
                closeModal();
            })
            .catch(err => {
                toast.error("Houve algum erro na edição da revista")
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={700}>
            <form className={style["wrapper"]} onSubmit={handleSubmit}>
                <Tabs items={getTabs} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Spin spinning={loading}>
                        <Button _type="primary" style={{ margin: "10px 0" }} type="submit">
                            <span>Editar</span>
                        </Button>
                    </Spin>
                </div>
            </form>
        </Modal>
    )
}

export default MagazineInfo;
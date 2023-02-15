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

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={700}>
            <div className={style["wrapper"]}>
                <Tabs items={getTabs} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Spin spinning={loading}>
                        <Button _type="primary" style={{ margin: "10px 0" }} type="submit" disabled>
                            <span>Editar</span>
                        </Button>
                    </Spin>
                </div>
            </div>
        </Modal>
    )
}

export default MagazineInfo;
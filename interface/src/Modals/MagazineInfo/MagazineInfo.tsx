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
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteFlow from "./Functions/DeleteFlow/DeleteFlow";
import NewEditions from "./Tabs/NewEditions/NewEditions";

interface Props {
    visible: boolean;
    closeModal: () => void;
    magazineInfo: magazineType
}

const MagazineInfo: React.FC<Props> = ({ visible, closeModal, magazineInfo }) => {
    const [period, setPeriod] = useState("");


    const queryClient = useQueryClient()
    const editMagazine = useMutation({
        mutationFn: ({ payload, magazineId }: { payload: newMagazinePayload, magazineId: string }) => new EditFlow(payload, magazineId).start(),
        onSuccess: () => {
            toast.success("Revista editada com sucesso");
            queryClient.invalidateQueries({ queryKey: "magazineList" });
            setTimeout(() => closeModal(), 500);
        },
        onError: () => {
            toast.error("Houve algum erro ao editar esta revista");
        }
    })

    const deleteMagazine = useMutation({
        mutationFn: () => new DeleteFlow(magazineInfo.magazineid).start(),
        onSuccess: () => {
            toast.success("Revista deletada com sucesso!");
            queryClient.invalidateQueries({ queryKey: "magazineList" });
            setTimeout(() => closeModal(), 500);
        },
        onError: () => {
            toast.error("Erro ao deletar revista");
        }
    })

    function getTabs() {
        return [
            {
                key: "0",
                label: "Informações",
                children: <Informations magazineInfo={magazineInfo} setPeriod={setPeriod} />
            },
            {
                key: "1",
                label: "Edições",
                children: <Editions magazineInfo={magazineInfo} />
            },
            {
                key: "2",
                label: "Novas edições",
                children: <NewEditions magazineInfo={magazineInfo} />
            }
        ]
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //@ts-ignore
        const { title, description, magazineImage, magazineUrl, sitemap, indexof, } = event.target;
        const payload = ({
            name: title.value,
            description: description.value,
            image: magazineImage.value,
            url: magazineUrl.value,
            creationDate: generateDate(),
            siteMap: sitemap.value,
            indexOf: indexof.value,
            updatePeriod: period
        } as unknown) as newMagazinePayload;
        const validation = new Validator(payload).start();
        if (validation.error) {
            return;
        };
        editMagazine.mutate({ payload, magazineId: magazineInfo.magazineid })
    }

    function handleDelete() {
        deleteMagazine.mutate();
    }

    return (
        <Modal open={visible} onCancel={closeModal} onOk={closeModal} maskClosable closable
            footer={null} title={null} bodyStyle={{ padding: 0 }} width={700}>
            <form className={style["wrapper"]} onSubmit={handleSubmit}>
                <Tabs items={getTabs()} />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Spin spinning={deleteMagazine.isLoading}>
                        <Button _type="danger" style={{ margin: "10px 15px" }} type="button" onClick={handleDelete}>
                            <span>Deletar</span>
                        </Button>
                    </Spin>
                    <Spin spinning={editMagazine.isLoading}>
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
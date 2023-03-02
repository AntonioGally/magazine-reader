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
import { useMutation, useQueryClient } from "react-query";

interface Props {
    visible: boolean;
    closeModal: () => void;
}

const NewMagazine: React.FC<Props> = ({ visible, closeModal }) => {
    const [period, setPeriod] = useState("");

    const queryClient = useQueryClient()
    const newMagazine = useMutation({
        mutationFn: (payload: newMagazinePayload) => new CreateFlow(payload).execute(),
        onSuccess: () => {
            toast.success("Revista criada com sucesso");
            queryClient.invalidateQueries({ queryKey: "magazineList" });
            closeModal();
        },
        onError: () => {
            toast.error("Houve algum erro ao criar uma nova revista");
        }
    })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
            return;
        };
        newMagazine.mutate(payload)
    }


    const getTabs = useMemo(() => {
        return [
            {
                key: "0",
                label: "Informações",
                children: <Informations setPeriod={setPeriod} />
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
                    <Spin spinning={newMagazine.isLoading}>
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
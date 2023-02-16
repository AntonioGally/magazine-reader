//Libs
import React, { useCallback, useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
//Components
import Table from "../../Components/Table/Table";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./newEditions.module.css";
//Types
import { magazineType } from "../Magazines/magazines.types";
import { ColumnsType } from "antd/lib/table";
import { newEditionType } from "./newEditions.types";
import { Spin } from "antd";
import { toast } from "react-toastify";

const NewEditions: React.FC = () => {

    const [_editionsArray, setEditionsArray] = useState<any[]>([])
    const [loading, setLoading] = useState({ magazineName: "", loading: false });

    const magazineQuery = useQuery<magazineType[]>("magazineList", () =>
        authHttp
            .get("/magazine")
            .then((res) => res.data)
    );

    function getEditons(magazineId: string) {
        return authHttp.post("/editions", { magazineId })
    }

    async function fetchEditions(magazines: magazineType[]) {
        for (let i = 0; i < magazines.length; i++) {
            let magazine = magazines[i];
            setLoading({ magazineName: magazine.magazinename, loading: true });
            try {
                const editions = await getEditons(magazine.magazineid)
                setEditionsArray((prev) => [...prev, ...editions.data]);
            } catch (err) {
                toast.error("Não foi possível cadastrar as edições da revista" + magazine.magazinename)
                console.error(err)
            }
            setLoading({ magazineName: "", loading: false });
        }
    }

    useEffect(function () {
        if (!magazineQuery.data) return;
        fetchEditions(magazineQuery.data);
    }, [magazineQuery.data])

    const getColumns: ColumnsType<newEditionType> = [
        {
            title: "Revista",
            dataIndex: "magazineName",
            render: (text, record) => <a target={"_blank"} href={record.magazineUrl}>{text}</a>,
        },
        {
            title: "Nova edição",
            dataIndex: "newEdition",
            render: (text, record) => <a target={"_blank"} href={record.newEdition}>{text.split("/").at(-1)}</a>
        },
    ];

    return (
        <div className={style["wrapper"]}>
            <Table columns={getColumns} data={_editionsArray} />
            {loading.loading && (
                <div className={style["loading-wrapper"]}>
                    <span>Carregando edições da revista: <b>{loading.magazineName}</b></span>
                    <Spin size="large" />
                </div>
            )}
        </div>
    )
}

export default NewEditions;
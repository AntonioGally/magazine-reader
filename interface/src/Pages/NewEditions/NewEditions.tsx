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

const NewEditions: React.FC = () => {

    const magazineQuery = useQuery<magazineType[]>("magazineList", () =>
        authHttp
            .get("/magazine")
            .then((res) => res.data)
    );

    const newEditionsQuery = useQueries(
        (magazineQuery.data || []).map(magazine => {
            // setIsNewEditionLoading(true)
            return {
                queryKey: ["magazineEditions", magazine.magazineid],
                queryFn: () => {
                    return authHttp.post("/editions", { magazineId: magazine.magazineid })
                },
                enabled: !!magazineQuery.data
            }
        })
    )

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



    const newEditionsArray: any = []
    Array.isArray(newEditionsQuery) && newEditionsQuery.forEach((query) => {
        if (!query.isError && query.data) {
            newEditionsArray.push(...query.data?.data);
        }
    });
    const isLoading =
        !!newEditionsQuery.find(q => q.isFetching)

    return (
        <div className={style["wrapper"]}>
            <Table columns={getColumns} data={newEditionsArray} />
            <Spin spinning={isLoading} size="large" style={{ marginTop: 20 }} />
        </div>
    )
}

export default NewEditions;
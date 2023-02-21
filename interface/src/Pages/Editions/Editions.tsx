//Libs
import React, { useMemo } from "react";
import { useQuery } from "react-query";
//Components
import Table from "../../Components/Table/Table";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./editions.module.css";
//Types
import { editionType } from "./editions.types";
import { ColumnsType } from "antd/lib/table";
import { getFormattedDate } from "../../scripts/utils";
import { paginatedType } from "../../@types/general";

const Editions: React.FC = () => {

    const { isLoading, error, data } = useQuery<paginatedType<editionType[]>>("editionList", () =>
        authHttp
            .get("/all-editions")
            .then((res) => res.data)
    );

    if (error) return <span>An error has occurred</span>;

    const getTableCol: ColumnsType<editionType> = [
        {
            title: "Revista",
            dataIndex: "magazinename",
            render: (text, record) => <a target={"_blank"} href={record.magazineurl}>{text}</a>,
        },
        {
            title: "Url",
            dataIndex: "editionurl",
            render: (text, record) => <a target={"_blank"} href={record.editionurl}>{text.split("/").at(-1)}</a>,
            sorter: (a, b) => {
                let _a = Number(a.editionurl.split("/").at(-1));
                let _b = Number(b.editionurl.split("/").at(-1));
                return _a - _b;
            }
        },
        {
            title: "Data de criação",
            render: (text, record) => <span>{getFormattedDate(record.editioncreateddate).dateString}</span>
        }
    ]




    return (
        <div className={style["wrapper"]}>
            <Table columns={getTableCol} paginatedData={data} loading={isLoading}
                onChange={(e) => { }} />
        </div>
    )
}

export default Editions;
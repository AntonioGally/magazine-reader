//Libs
import React, { useMemo } from "react";
import { useQuery } from "react-query";
//Components
import { Table } from "antd";
//Scripts
import authHttp from "../../scripts/authHttp";
//Css
import style from "./editions.module.css";
//Types
import { editionType } from "./editions.types";
import { ColumnsType } from "antd/lib/table";
import { getFormattedDate } from "../../scripts/utils";

const Editions: React.FC = () => {

    const { isLoading, error, data, isFetching } = useQuery<editionType[]>("editionList", () =>
        authHttp
            .get("/all-editions")
            .then((res) => res.data)
    );

    if (isLoading || !data) return <span>Loading...</span>
    if (error) return <span>An error has occurred</span>;

    const getTableCol: ColumnsType<editionType> = useMemo(() => {
        return [
            {
                title: "Revista",
                dataIndex: "magazinename",
                render: (text, record) => <a href={record.magazineurl}>{text}</a>,
            },
            {
                title: "Url",
                dataIndex: "editionurl",
                render: (text, record) => <a href={record.editionurl}>{text.split("/").at(-1)}</a>
            },
            {
                title: "Data de criação",
                render: (text, record) => <span>{getFormattedDate(record.editioncreateddate).dateString}</span>
            }
        ]
    }, [data]);



    return (
        <div className={style["wrapper"]}>
            <Table columns={getTableCol} dataSource={data} bordered
                pagination={{ position: ["bottomRight"], showSizeChanger: true }} size={"middle"}
            />
        </div>
    )
}

export default Editions;
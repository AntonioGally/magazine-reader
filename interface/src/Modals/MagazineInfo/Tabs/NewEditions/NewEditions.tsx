import { Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { useQuery } from "react-query";
import Table from "../../../../Components/Table/Table";
import { magazineType } from "../../../../Pages/Magazines/magazines.types";
import authHttp from "../../../../scripts/authHttp";

type Props = {
    magazineInfo: magazineType
}

const NewEditions: React.FC<Props> = ({ magazineInfo }) => {
    const { isLoading, error, data, isFetching } = useQuery<any>("singleNewEditionList", () =>
        authHttp
            .post(`/editions`, { magazineId: magazineInfo.magazineid })
            .then((res) => res.data)
    );

    if (isLoading || !data) return <Spin size="default" />
    if (error) return <span>An error has occurred</span>;

    const getTableCol: ColumnsType<any> = [
        {
            title: "Url",
            dataIndex: "newEdition",
            render: (text, record) => <a target={"_blank"} href={record.newEdition}>{text.split("/").at(-1)}</a>,
            sorter: (a, b) => {
                let _a = Number(a.newEdition.split("/").at(-1));
                let _b = Number(b.newEdition.split("/").at(-1));
                return _a - _b;
            }
        },
    ]

    return (
        <Table columns={getTableCol} data={data} />
        // <></>
    )
}

export default NewEditions;
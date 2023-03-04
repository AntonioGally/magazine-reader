import { Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../../../../Components/Loading/Loading";
import Table from "../../../../Components/Table/Table";
import { magazineType } from "../../../../Pages/Magazines/magazines.types";
import authHttp from "../../../../scripts/authHttp";
import { getPath } from "../../../../scripts/utils";

type Props = {
    magazineInfo: magazineType
}

const NewEditions: React.FC<Props> = ({ magazineInfo }) => {
    const { isLoading, error, data, isFetching } = useQuery<any>(["singleNewEditionList", magazineInfo.magazineid], () =>
        authHttp
            .post(`/editions`, { magazineId: magazineInfo.magazineid })
            .then((res) => res.data)
    );

    if (isLoading || !data) return <Loading message={`Listando novas edições`} />
    if (error) return <span>An error has occurred</span>;

    const getTableCol: ColumnsType<any> = [
        {
            title: "Url",
            dataIndex: "newEdition",
            render: (text, record) => <a target={"_blank"} href={record.newEdition}>{text.split("/").at(-1) || getPath(text)}</a>,
            sorter: (a, b) => {
                let _a = a.newEdition.toLowerCase().trim();
                let _b = b.newEdition.toLowerCase().trim();
                return _a.localeCompare(_b);
            }
        },
    ]

    return (
        <Table columns={getTableCol} data={data} />
    )
}

export default NewEditions;
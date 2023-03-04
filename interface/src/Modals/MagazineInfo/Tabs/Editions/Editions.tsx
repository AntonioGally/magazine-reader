import React, { useMemo } from "react";
import { ColumnsType } from "antd/lib/table";

import { editionType } from "../../../../Pages/Editions/editions.types";
import { getFormattedDate } from "../../../../scripts/utils";
import { useQuery } from "react-query";
import authHttp from "../../../../scripts/authHttp";
import { magazineType } from "../../../../Pages/Magazines/magazines.types";
import Table from "../../../../Components/Table/Table";
import Loading from "../../../../Components/Loading/Loading";

type Props = {
    magazineInfo: magazineType
}

const Editions: React.FC<Props> = ({ magazineInfo }) => {

    const { isLoading, error, data, isFetching } = useQuery<editionType[]>(["singleEditionList", magazineInfo.magazineid], () =>
        authHttp
            .get(`/editions?magazineId=${magazineInfo.magazineid}`)
            .then((res) => res.data)
    );

    const getTableCol: ColumnsType<editionType> = [
        {
            title: "Url",
            dataIndex: "editionurl",
            render: (text, record) => <a target={"_blank"} href={record.editionurl}>{text}</a>
        },
        {
            title: "Data de criação",
            render: (text, record) => <span>{getFormattedDate(record.editioncreateddate).dateString}</span>
        }
    ]

    if (isLoading || !data) return <Loading message="Listando edições cadastradas" />
    if (error) return <span>An error has occurred</span>;

    return (
        <>
            <Table columns={getTableCol} data={data} />
        </>
    )
}

export default Editions;
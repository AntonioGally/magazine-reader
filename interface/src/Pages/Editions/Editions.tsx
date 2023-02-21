//Libs
import React, { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
//Components
import { Button, Space, Input } from "antd";
import Table from "antd/lib/table";
//Scripts
import authHttp from "../../scripts/authHttp";
import { getFormattedDate } from "../../scripts/utils";
//Assets
import { SearchOutlined } from '@ant-design/icons';
//Css
import style from "./editions.module.css";
//Types
import { editionType } from "./editions.types";
import { paginatedType } from "../../@types/general";
import { ColumnsType } from "antd/lib/table";

type editionTypeKeys = keyof editionType;

const Editions: React.FC = () => {

    const [filterSearch, setFilterSearch] = useState("");
    const [query, setQuery] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<any>(null);
    const [tableParams, setTableParams] = useState({
        page: 1,
        pageSize: 20,
        urlSort: "ascend" || undefined
    })

    const columnSearchInput = useRef<any>(null);

    const { isLoading, error, data } = useQuery<paginatedType<editionType[]>>(["editionList", tableParams.page, tableParams.pageSize, tableParams.urlSort, query], {
        queryFn: () => authHttp.get(`/all-editions/paginated?page=${tableParams.page}&limit=${tableParams.pageSize}&urlSort=${tableParams.urlSort}&q=${query}`).then((res) => res.data)
    });


    if (error) return <span>An error has occurred</span>;


    function handleReset(clear: any, setSelectedKeys: any) {
        setSelectedKeys([]);
        clear();
    }

    const getColumnFilterProps = useCallback((dataIndex: string) => {
        return {
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : "#8e8e8e" }} />
            ),
            onFilter: (value: any, record: any) =>
                record[dataIndex]
                    ?.toString()
                    .toLowerCase()
                    .includes((value).toLowerCase()),
            onFilterDropdownVisibleChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => columnSearchInput.current?.select(), 100);
                }
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
                return (
                    <div className={style["column-filter-input-area"]}>
                        <Input
                            ref={columnSearchInput}
                            placeholder="Pesquisar..."
                            value={selectedKeys[0]}
                            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => confirm()}
                        />
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => confirm()}
                                icon={<SearchOutlined />}
                                size="small"
                                style={{ width: 90 }}
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => clearFilters && handleReset(clearFilters, setSelectedKeys)}
                                size="small"
                                style={{ width: 90 }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </div>
                )
            },
        }
    }, [])

    const getTableCol: ColumnsType<editionType> = [
        {
            title: "Revista",
            dataIndex: "magazinename",
            render: (text, record) => <a target={"_blank"} href={record.magazineurl}>{text}</a>,
            ...getColumnFilterProps("magazinename"),
        },
        {
            title: "Url",
            dataIndex: "editionurl",
            render: (text, record) => <a target={"_blank"} href={record.editionurl}>{text.split("/").at(-1)}</a>,
            sortDirections: ["ascend", "descend"],
            sorter: (a, b) => 0,
            ...getColumnFilterProps("editionurl"),
        },
        {
            title: "Data de criação",
            dataIndex: "editioncreateddate",
            render: (text, record) => <span>{getFormattedDate(record.editioncreateddate).dateString}</span>,
            ...getColumnFilterProps("editioncreateddate"),
        }
    ]

    function handleSearch(value: string) {
        setFilterSearch(value);
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        setSearchTimeout(setTimeout(() => setQuery(value), 300));
    }



    return (
        <div className={style["wrapper"]}>
            <div style={{ width: "30%", marginBottom: 15 }}>
                <Input value={filterSearch} type="search"
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
            <Table columns={getTableCol} dataSource={data?.results} bordered
                pagination={{
                    position: ["bottomRight"],
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                    total: data?.totalRecords,
                    defaultPageSize: 20,
                    showTotal: (total) => <span className={style["pagination-total"]}>{total}</span>
                }}
                loading={isLoading}
                onChange={(pagination, filters, sorter, extra) => {
                    if (pagination) {
                        setTableParams(prev => ({ ...prev, page: pagination.current || 1, pageSize: pagination.pageSize || 20 }))
                    }
                    if (sorter && !Array.isArray(sorter)) {
                        setTableParams(prev => ({ ...prev, urlSort: sorter.order || "ascend" }))
                    }
                }}
                size={"middle"} />
        </div>
    )
}

export default Editions;
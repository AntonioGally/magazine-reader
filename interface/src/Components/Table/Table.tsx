//Libs
import React, { useCallback, useEffect, useRef, useState } from "react";
//Components
import { Table as ANTTable, Input, Button, Space } from "antd";
//Assets
import { SearchOutlined } from '@ant-design/icons';
//Types
import { Props } from "./table.types";
//Css
import style from "./table.module.css";

const Table: React.FC<Props> = (props) => {

    const [filterSearch, setFilterSearch] = useState("");
    const [editedColumns, setEditedColumns] = useState(props.columns);

    const columnSearchInput = useRef<any>(null);

    let filteredContent = null;
    if (Array.isArray(props.data)) {
        filteredContent = props.data?.filter(item => Object.keys(item).some(
            keys => {
                return item[keys] !== null && item[keys].toString().toLowerCase().includes(filterSearch.toLowerCase())
            }
        ));
    }

    function handleReset(clear: any, setSelectedKeys: any) {
        setEditedColumns((prev: any) => prev.map((column: any) => {
            const newObj = column;
            delete newObj?.filteredValue;
            return newObj;
        }));
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

    useEffect(() => {
        setEditedColumns((prev: any) => prev.map((column: any) => ({
            ...column,
            ...getColumnFilterProps(column.dataIndex),
        })))
    }, []);

    return (
        <>
            <div style={{ width: "30%", marginBottom: 15 }}>
                <Input value={filterSearch} type="search"
                    onChange={e => {
                        setFilterSearch(e.target.value);
                    }}
                />
            </div>
            <ANTTable columns={editedColumns || props.columns} dataSource={filteredContent || props.data} bordered
                {...props.title && { title: (data) => <span>{props.title}</span> }}
                pagination={{
                    position: ["bottomRight"],
                    showSizeChanger: true,
                    hideOnSinglePage: true,
                }}
                loading={props.loading}
                size={"middle"}
            />
        </>
    )
}

export default Table;
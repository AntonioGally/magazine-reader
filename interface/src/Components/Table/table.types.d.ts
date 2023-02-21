import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { paginatedType } from "../../@types/general";

export type Props = {
    data?: any;
    columns: any
    loading?: boolean;
}
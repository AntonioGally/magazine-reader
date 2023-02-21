import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/lib/table/interface";
import { paginatedType } from "../../@types/general";

export type Props = {
    data?: any;
    paginatedData?: paginatedType<unknown[]>
    columns: any
    loading?: boolean;
    onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[], extra: TableCurrentDataSource<any>) => void;
}
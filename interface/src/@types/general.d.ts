export interface promiseSuccess<T> {
    data: T | any;
}

export interface paginatedType<T> {
    next: {
        page: number;
        limit: number;
    };
    previous?: {
        page: number;
        limit: number;
    };
    pageCount: number;
    totalRecords: number;
    results: T;
}
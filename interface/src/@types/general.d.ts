export interface promiseSuccess<T> {
    data: T;
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
    totalRecords: number;
    results: T;
}
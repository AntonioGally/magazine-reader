export type magazineType = {
    magazineid: string;
    magazinename: string;
    magazinedescription: string;
    magazineimage: string;
    magazineurl: string;
    magazinecreateddate: string;
    magazinecreatedby: string;
    magazinesitemap: string;
    magazineindexof: string;
}

export type paginatedMagazine = {
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
    results: magazineType[];
}
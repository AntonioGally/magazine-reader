export type storePayload = {
    userId: string;
    information: {
        name: string;
        description: string;
        image: string;
        url: string;
        creationDate: string;
    }
}

export type storeSelectorPayload = {
    magazineId: string;
    name: string;
    siteMapUrl: string;
    searchFor: string;
}
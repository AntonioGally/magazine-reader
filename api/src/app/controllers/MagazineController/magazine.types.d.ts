export type storePayload = {
    userId: string;
    information: {
        name: string;
        description: string;
        image: string;
        url: string;
        creationDate: string;
    };
    selectors: {
        container: string;
        singleEdition: string;
        editionInputs: {
            name: string;
            description: string;
            image: string;
            url: string;
        };
    };
}
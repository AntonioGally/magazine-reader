import { magazineType } from "../../Pages/Magazines/magazines.types";
import { newEditionType } from "../../Pages/NewEditions/newEditions.types";
import * as editionType from "./newEditions.type";

export const setNewEditions = (newEditions: newEditionType[]) => {
    return {
        type: editionType.SET_NEW_EDITIONS,
        data: newEditions
    }
}

export const clearNewEditions = () => {
    return {
        type: editionType.CLEAR_NEW_EDITIONS,
    }
}

export const setFailedMagazines = (failedMagazines: magazineType) => {
    return {
        type: editionType.SET_FAILED_MAGAZINES,
        data: failedMagazines
    }
}

export const clearFailedMagazines = () => {
    return {
        type: editionType.CLEAR_FAILED_MAGAZINES
    }
}
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
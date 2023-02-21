import { newEditionType } from "../../Pages/NewEditions/newEditions.types";
import * as editionType from "./newEditions.type";

const initialState: editionType.newEditionsReducer = {
    editionsArray: null,
    failedMagazines: null
};

type actionType = {
    type: string;
    data: any;
}

const newEditionsReducer = (state: editionType.newEditionsReducer = initialState, action: actionType) => {
    switch (action.type) {
        case editionType.SET_NEW_EDITIONS:
            return { ...state, editionsArray: [...state.editionsArray || [], ...action.data] }
        case editionType.CLEAR_NEW_EDITIONS:
            return { ...state, editionsArray: null }
        case editionType.SET_FAILED_MAGAZINES:
            return { ...state, failedMagazines: [...state.failedMagazines || [], action.data] }
        case editionType.CLEAR_FAILED_MAGAZINES:
            return { ...state, failedMagazines: null }
        default:
            return state
    }
}

export default newEditionsReducer;
import { newEditionType } from "../../Pages/NewEditions/newEditions.types";
import * as editionType from "./newEditions.type";

const initialState: editionType.newEditionsReducer = {
    editionsArray: null
};

type actionType = {
    type: string;
    data: any;
}

const newEditionsReducer = (state: editionType.newEditionsReducer = initialState, action: actionType) => {
    switch (action.type) {
        case editionType.SET_NEW_EDITIONS:
            return { ...state, editionsArray: action.data }
        case editionType.CLEAR_NEW_EDITIONS:
            return { ...state, editionsArray: null }
        default:
            return state
    }
}

export default newEditionsReducer;
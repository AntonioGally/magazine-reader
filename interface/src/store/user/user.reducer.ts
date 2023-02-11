import * as userTypes from "./user.types";

const initialState: userTypes.userReducer = {
    userInfo: null
};

type actionType = {
    type: string;
    data: any;
}

const userReducer = (state: userTypes.userReducer = initialState, action: actionType) => {
    switch (action.type) {
        case userTypes.SET_USER:
            return { ...state, userInfo: action.data }
        default:
            return state
    }
}

export default userReducer;
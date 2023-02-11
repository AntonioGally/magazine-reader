import * as userTypes from "./user.types";

export const setUser = (userInfo: userTypes.userInfoType) => {
    return {
        type: userTypes.SET_USER,
        data: userInfo
    }
}
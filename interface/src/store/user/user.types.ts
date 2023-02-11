export const SET_USER = "SET_USER";


export type userReducer = {
    userInfo: userInfoType | null;
}

export type userInfoType = {
    accessToken: string;
    userid: string;
    username: string;
    userlastname: string;
    useremail: string;
    userpassword: string;
    usercreationdate: string;
}
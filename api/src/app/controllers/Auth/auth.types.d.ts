export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignUpPayload {
    name: string;
    lastName: string;
    email: string;
    password: string;
    creationDate: string;
}
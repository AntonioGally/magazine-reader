import { newEditionType } from "../../Pages/NewEditions/newEditions.types";

export const SET_NEW_EDITIONS = "SET_NEW_EDITIONS";
export const CLEAR_NEW_EDITIONS = "CLEAR_NEW_EDITIONS"

export type newEditionsReducer = {
    editionsArray: newEditionType[] | null;
}
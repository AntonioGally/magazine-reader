import { magazineType } from "../../Pages/Magazines/magazines.types";
import { newEditionType } from "../../Pages/NewEditions/newEditions.types";

export const SET_NEW_EDITIONS = "SET_NEW_EDITIONS";
export const CLEAR_NEW_EDITIONS = "CLEAR_NEW_EDITIONS"
export const SET_FAILED_MAGAZINES = "SET_FAILED_MAGAZINES";
export const CLEAR_FAILED_MAGAZINES = "CLEAR_FAILED_MAGAZINES";

export type newEditionsReducer = {
    editionsArray: newEditionType[] | null;
    failedMagazines: magazineType[] | null;
}
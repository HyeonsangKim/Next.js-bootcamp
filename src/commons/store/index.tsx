import {atom, RecoilEnv, selector} from "recoil"
import { getAccessToken } from "../libraries/getAccessToken"

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

export const isEditState = atom({
    key: "isEditState",
    default: false,
})

export const accessTokenState = atom({
    key: "accessTokenState",
    default: "",
})

export const visitedPageState = atom({
    key: "visitedPageState",
    default: "",
})

export const restoreAccessTokenLoadable = selector({
    key: "restoreAccessTokenLoadable",
    get: async ()=>{
        const newAccessToken = await getAccessToken();
        return newAccessToken;
    }
})
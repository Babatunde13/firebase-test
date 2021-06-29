import { combineReducers } from "redux";
import timestamp from "./timestamp";
import user from "./user";


export default combineReducers({
    user,
    timestamp
})
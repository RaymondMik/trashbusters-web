import locations from "./locations";
import modal from "./modal";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ locations, modal });

export default rootReducer;
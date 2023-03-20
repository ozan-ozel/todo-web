import { combineReducers } from "@reduxjs/toolkit";

import JwtReducer from "./JwtActions";

export default combineReducers({
	jwt: JwtReducer
});

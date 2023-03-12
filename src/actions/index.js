import { combineReducers } from "@reduxjs/toolkit";

import ExampleReducer from "./ExampleActions";
import JwtReducer from "./JwtActions";

export default combineReducers({
	example: ExampleReducer,
	jwt: JwtReducer
});

import { combineReducers, createStore } from "redux";
import { IState } from "./states";
import { userReducer } from "./reducers/UserReducer";

const combinedReducer = combineReducers<IState>({
	user: userReducer,
});

export const store = createStore(combinedReducer);

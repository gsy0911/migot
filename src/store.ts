import { combineReducers, createStore } from "redux";
import { IState } from "./states";
import { taskReducer } from "./reducers";

const combinedReducer = combineReducers<IState>({
	taskList: taskReducer,
});

export const store = createStore(combinedReducer);

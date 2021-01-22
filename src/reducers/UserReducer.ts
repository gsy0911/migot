import { reducerWithInitialState } from "typescript-fsa-reducers";
import { changeUserAction } from "../actions/UserAction";
import { IUser } from "../states";

const initUser: IUser = {
	count: 0,
	name: "",
};

export const userReducer = reducerWithInitialState<IUser>(initUser)
	.case(changeUserAction, (state, payload) => ({
		...state,
		...payload,
	}))
	.build();

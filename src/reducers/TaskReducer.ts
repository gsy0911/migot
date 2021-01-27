import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ITaskList } from "../states";
import { showTaskListAction } from "../actions";

const initState: ITaskList = {
	tasks: [],
	loading: false,
	failedMessage: "",
};

export const taskReducer = reducerWithInitialState<ITaskList>(initState)
	.case(showTaskListAction.started, (state) => ({
		...state,
		loading: true,
		failedMessage: "",
	}))
	.case(showTaskListAction.done, (state, payload) => ({
		...state,
		tasks: payload.result,
		loading: false,
		failedmessage: "",
	}))
	.case(showTaskListAction.failed, (state, payload) => ({
		...state,
		loading: false,
		failedMessage: payload.error,
	}))
	.build();

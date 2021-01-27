import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ITaskList } from "../states";
import {
	showTaskListAction,
	addTaskAction,
	deleteTaskAction,
	toggleCompleteAction,
} from "../actions";

const initState: ITaskList = {
	tasks: [],
	loading: false,
	failedMessage: "",
};

export const taskReducer = reducerWithInitialState<ITaskList>(initState)
	.case(showTaskListAction, (state, payload) => ({
		...state,
		tasks: payload,
	}))
	.case(addTaskAction, (state, payload) => {
		const taskList = [...state.tasks, payload];
		return {
			...state,
			tasks: taskList,
		};
	})
	.case(deleteTaskAction, (state, payload) => {
		const taskList = state.tasks.filter((task) => task.id !== payload);
		return {
			...state,
			tasks: taskList,
		};
	})
	.case(toggleCompleteAction, (state, payload) => {
		const taskList = [...state.tasks];
		const task = taskList.find((task) => task.id === payload);

		if (!task) {
			return state;
		}

		task.completed = !task.completed;
		return {
			...state,
			tasks: taskList,
		};
	})
	.build();

import { Dispatch } from "redux";
import { actionCreatorFactory } from "typescript-fsa";
import { ITask } from "../states";

const actionCreator = actionCreatorFactory("task-actions");

export const showTaskListAction = actionCreator<ITask[]>("show-task-list");

export const addTaskAction = actionCreator<ITask>("add");

export const toggleCompleteAction = actionCreator<string>("toggle-complete");

export const deleteTaskAction = actionCreator<string>("delete");

const dummyTasks: ITask[] = [
	{
		completed: false,
		deadline: new Date(),
		id: "0",
		title: "task0",
	},
	{
		completed: false,
		deadline: new Date(),
		id: "1",
		title: "task1",
	},
	{
		completed: false,
		deadline: new Date(),
		id: "2",
		title: "task2",
	},
];

export const getTaskList = (dispatch: Dispatch): void => {
	dispatch(showTaskListAction(dummyTasks));
};

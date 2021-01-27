import { Dispatch } from "redux";
import "../core/ICore";
import { actionCreatorFactory } from "typescript-fsa";
import { ITask } from "../states";

const actionCreator = actionCreatorFactory("task-actions");

/**
 * create actions below
 * - starting: type => null
 * - done: type => ITask[]
 * - failure =>  string as message
 */
export const showTaskListAction = actionCreator.async<null, ITask[], string>(
	"show-task-list"
);

export const getTaskList = async (dispatch: Dispatch): Promise<void> => {
	dispatch(showTaskListAction.started(null));
	const taskList = await window.core.loadTaskList().catch((e) => {
		console.error(e);
		dispatch(
			showTaskListAction.failed({
				error: "failed to load file",
				params: null,
			})
		);
	});
	if (!taskList) return;
	dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const addTask = async (
	task: ITask,
	dispatch: Dispatch
): Promise<void> => {
	dispatch(showTaskListAction.started(null));
	const taskList = await window.core.saveTask(task).catch((e) => {
		console.error(e);
		dispatch(
			showTaskListAction.failed({
				error: "failed to write file.",
				params: null,
			})
		);
	});
	if (!taskList) return;
	dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const toggleTask = async (
	task: ITask,
	dispatch: Dispatch
): Promise<void> => {
	dispatch(showTaskListAction.started(null));
	task.completed = !task.completed;
	const taskList = await window.core.saveTask(task).catch((e) => {
		console.error(e);
		dispatch(
			showTaskListAction.failed({
				error: "failed to write file.",
				params: null,
			})
		);
	});
	if (!taskList) return;
	dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

export const deleteTask = async (
	taskId: string,
	dispatch: Dispatch
): Promise<void> => {
	dispatch(showTaskListAction.started(null));
	const taskList = await window.core.deleteTask(taskId).catch((e) => {
		console.error(e);
		dispatch(
			showTaskListAction.failed({
				error: "failed to write file.",
				params: null,
			})
		);
	});
	if (!taskList) return;
	dispatch(showTaskListAction.done({ result: taskList, params: null }));
};

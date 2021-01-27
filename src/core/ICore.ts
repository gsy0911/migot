import { ITask } from "../states/ITask";

export default interface ICore {
	loadTaskList: () => Promise<ITask[]>;
	saveTask: (task: ITask) => Promise<ITask[]>;
	deleteTask: (taskId: string) => Promise<ITask[]>;
}
// window オブジェクトに、core の定義を追加する。
declare global {
	interface Window {
		core: ICore;
	}
}

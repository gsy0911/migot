export interface ITask {
	completed: boolean;
	deadline: Date;
	id: string;
	title: string;
}

export interface ITaskList {
	tasks: ITask[];
}

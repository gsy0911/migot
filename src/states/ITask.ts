export interface ITask {
	completed: boolean;
	deadline: Date;
	id: string;
	title: string;
}

export interface ITaskList {
	tasks: ITask[];
	// spinner
	loading: boolean;
	// message on failure
	failedMessage: string;
}

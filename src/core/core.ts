import fs from "fs-extra";
import os from "os";
import path from "path";
import { nanoid } from "nanoid";
import { ITask } from "../states/ITask";
import ICore from "./ICore";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { CredentialProvider } from "@aws-sdk/types";

// save profile data in each OS user
const dataFilePath = path.join(os.homedir(), "todo.json");

const setTimeoutPromise = (count: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, count);
	});
};

export const __private__ = {
	reviver: (key: string, value: unknown): unknown => {
		if (key === "deadline") {
			return new Date(value as string);
		} else {
			return value;
		}
	},
	replacer: (key: string, value: unknown): unknown => {
		if (key !== "deadline") {
			return value;
		} else {
			return new Date(value as string).toISOString();
		}
	},
};

const loadTaskList = async (): Promise<ITask[]> => {
	const exist = await fs.pathExists(dataFilePath);

	if (!exist) {
		fs.ensureFileSync(dataFilePath);
		await fs.writeJSON(dataFilePath, { data: [] });
	}

	const jsonData = (await fs.readJSON(dataFilePath, {
		reviver: __private__.reviver,
	})) as { data: ITask[] };

	await setTimeoutPromise(100);
	return jsonData.data;
};

const saveTaskList = async (taskList: ITask[]): Promise<void> => {
	await fs.writeJSON(
		dataFilePath,
		{ data: taskList },
		{
			replacer: __private__.replacer,
			spaces: 2,
		}
	);
};

const saveTask = async (task: ITask): Promise<ITask[]> => {
	await setTimeoutPromise(100);
	const taskList = await loadTaskList();
	const existTask = taskList.find((pTask) => pTask.id === task.id);
	if (!task.id || !existTask) {
		task.id = nanoid();
		taskList.push(task);
	} else {
		existTask.completed = task.completed;
		existTask.deadline = task.deadline;
		existTask.title = task.title;
	}
	await saveTaskList(taskList);
	return taskList;
};

const deleteTask = async (id: string): Promise<ITask[]> => {
	await setTimeoutPromise(100);
	const taskList = await loadTaskList();
	const deleteTaskList = taskList.filter((task) => task.id !== id);
	await saveTaskList(deleteTaskList);
	return deleteTaskList;
};

const credentialProvider = (): CredentialProvider => {
	return defaultProvider();
};

export const core: ICore = {
	loadTaskList,
	saveTask,
	deleteTask,
	credentialProvider,
};

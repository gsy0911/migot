import { ITask } from "../states/ITask";
import { CredentialProvider } from "@aws-sdk/types";

export default interface ICore {
	loadTaskList: () => Promise<ITask[]>;
	saveTask: (task: ITask) => Promise<ITask[]>;
	deleteTask: (taskId: string) => Promise<ITask[]>;
	credentialProvider: () => CredentialProvider;
}
// window オブジェクトに、core の定義を追加する。
declare global {
	interface Window {
		core: ICore;
	}
}

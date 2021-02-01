import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../states/IState';
import { ITask, ITaskList } from '../states/ITask';
import { AddTask } from './AddTask';
import { styled } from '../FoundationStyle';
import { TaskRow, MaterialTaskRow } from './TaskRow';
import { getTaskList } from '../actions';
import { Loading } from './Loading';


const MainContainer = styled.div`
	margin: 10px auto 0 auto;
	max-width: 600px;
	min-width: 300px;
	width: 80%;
`;


const Header = styled.h1`
	background-color: ${(p): string => p.theme.PRIMARY_3};
	color: ${(p): string => p.theme.FOREGROUND_REVERSE};
	font-size: 160%;
	padding: 1em;
	text-align: center;
`;


const TaskList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1em;
`;


const createTaskList = (tasks: ITask[]): JSX.Element[] => {
	return tasks.sort(
		(a, b) => {
			return a.deadline < b.deadline
				? -1
				: a.deadline.getTime() === b.deadline.getTime()
				? 0
				: 1;
		}
	)
	.map(it => {
		console.log(it)
		return <MaterialTaskRow key={it.id} data={it} />
	});
}

export const TaskListContainer: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		void getTaskList(dispatch);
	}, [])

	const taskList = useSelector<IState, ITaskList>(a => a.taskList);
	const taskListElement = useMemo(() => {
		return createTaskList(taskList.tasks);
	}, [taskList.tasks]);

	const errorMessage = useMemo(() => {
		if (!taskList.failedMessage) {
		  return null;
		}
		<p>{taskList.failedMessage}</p>;
	  }, [taskList.failedMessage]);

	return (
		<div>
			<Header>TODO</Header>
			<MainContainer>
				<AddTask />
				<TaskList>{taskListElement}</TaskList>
			</MainContainer>
			<Loading shown={taskList.loading} />
		</div>
	)
}

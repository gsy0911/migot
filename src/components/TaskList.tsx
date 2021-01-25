import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../states/IState';
import { ITask, ITaskList } from '../states/ITask';
import { AddTask } from './AddTask';
import { styled } from '../FoundationStyle';
import { TaskRow } from './TaskRow';
import { getTaskList } from '../actions';
import { SlowBuffer } from 'buffer';


const MainContainer = styled.div``;


const Header = styled.h1``;


const TaskList = styled.div``;


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
		return <TaskRow key={it.id} data={it} />
	});
}

export const TaskListContainer: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		getTaskList(dispatch);
	}, [])

	const taskList = useSelector<IState, ITaskList>(a => a.taskList);
	const taskListElement = useMemo(() => {
		return createTaskList(taskList.tasks);
	}, [taskList.tasks]);

	return (
		<div>
			<Header>TODO</Header>
			<MainContainer>
				<AddTask />
				<TaskList>{taskListElement}</TaskList>
			</MainContainer>
		</div>
	)
}

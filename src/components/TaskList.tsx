import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../states/IState';
import { ITask, ITaskList } from '../states/ITask';
import { MaterialAddTask } from './AddTask';
import { MaterialTaskRow } from './TaskRow';
import { getTaskList } from '../actions';
import { Loading } from './Loading';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
	root: {
		color: theme.palette.primary.main
	},
	container: {
		margin: "10px auto 0 auto",
		maxWidth: "600px",
		minWidth: "300px",
		width: "80%"
	}
}))

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
	const classes = useStyles()
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
		<div className={classes.root}>
			<Container fixed className={classes.container}>
				<MaterialAddTask />
				{taskListElement}
			</Container>
			<Loading shown={taskList.loading} />
		</div>
	)
}

import React, { useCallback, useMemo, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../actions';
import { ITask } from '../states';
import { styled } from '../FoundationStyle';

import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardContent: {
		flexGrow: 1,
	}
}))

export const MaterialTaskRow: React.FC<{ data: ITask}> = (props) => {
	const classes = useStyles()

	const { data } = props;
	const dispatch = useDispatch();

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" component="h2">
						{data.title}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

const Task = styled.div<{ expiration: boolean }>`
	align-items: center;
	background-color: ${(p): string => p.expiration ? 'inherit' : p.theme.SECONDARY_2_0};
	border-radius: 5px;
	cursor: pointer;
	border: 1px solid rgb(200, 200, 200);
	display: flex;
	flex-direction: row;
	margin-bottom: 1em;
	padding: 10px;
	transition-duration: 0.2s;
	transition-property: all;
	&:hover {
		transform: translate(-5px, -5px);
		box-shadow: 5px 5px 5px rgba(200, 200, 200, 4);
	}
`;

const TaskCheckBox = styled.div`
	align-items: center;
	background-color: #fff;
	border: 2px solid #ccc;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	flex-grow: 0;
	flex-shrink: 0;
	height: 2em;
	width: 2em;
`;

const TaskCheck = styled.p`
	color: ${(p): string => p.theme.SECONDARY_1_3};
	font-size: 150%;
`;

const TaskBody = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	flex-shrink: 0;
	height: 3em;
	justify-content: space-around;
`;

const TaskRemove = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
`;

const TaskName = styled.div`
	font-size: 120%;
`;

const Deadline = styled.div``;


export const TaskRow: React.FC<{ data: ITask }> = (props) => {
	const { data } = props;
	const dispatch = useDispatch();

	const expiration = useMemo(() => {
		return new Date() < data.deadline || data.completed;
	}, [data.deadline, data.completed]);

	const deadlineString = useMemo(() => {
		return data.deadline.toString()
	}, [data.deadline])

	const onRowCLick = useCallback(() => {
		void toggleTask(data, dispatch);
	}, [data])

	const onDeleteClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			void deleteTask(data.id, dispatch);
			e.stopPropagation();
		},
		[data.id]
	);
	return (
		<Task expiration={expiration} onClick={onRowCLick}>
			<TaskCheckBox>
				<TaskCheck>{data.completed ? 'Y': null}</TaskCheck>
			</TaskCheckBox>

			<TaskBody>
				<TaskName>{data.title}</TaskName>
				<Deadline>{deadlineString}</Deadline>
			</TaskBody>
			<TaskRemove onClick={onDeleteClick}>X</TaskRemove>
		</Task>
	);
};

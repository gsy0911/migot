import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../actions';
import { ITask } from '../states';

import { IconButton, Card, Checkbox, CardHeader, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

export const MaterialTaskRow: React.FC<{ data: ITask }> = (props) => {
	const classes = useStyles()

	const { data } = props;
	const dispatch = useDispatch();

	const expiration = useMemo(() => {
		return new Date() < data.deadline || data.completed;
	}, [data.deadline, data.completed]);

	const deadlineString = useMemo(() => {
		return data.deadline.toString()
	}, [data.deadline]);

	const onRowCLick = useCallback(() => {
		void toggleTask(data, dispatch);
	}, [data]);

	const onDeleteClick = useCallback(() => {
		void deleteTask(data.id, dispatch);
	}, [data.id]);
	return (
		<Grid item>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<CardHeader
						avatar={
							<Checkbox
							checked={data.completed}
							onClick={onRowCLick}
							name="isCompleted"
							color="primary"
							/>
						}
						action={
							<IconButton aria-label="delete" onClick={onDeleteClick}>
								<DeleteForeverIcon />

							</IconButton>
						}
						title={data.title}
						subheader={deadlineString}
						/>
				</CardContent>
			</Card>
		</Grid>
	)
}

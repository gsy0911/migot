import React, { ChangeEvent, useCallback,  useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../actions';
import { nanoid } from "nanoid";

import { IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
  	}));

export const MaterialAddTask: React.FC = () => {
	const classes = useStyles()

	const dispatch = useDispatch();

	const [deadline, setDeadline] = useState<Date>(new Date());

	const [title, setTitle] = useState<string>('');
	const onChangeTaskName = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setTitle(e.currentTarget.value);
	}, []);

	const onChangeDeadline = useCallback((date: MaterialUiPickersDate) => {
		if (date) {
			setDeadline(date)
		}
	}, [])

	const onClickAddButton = useCallback(() => {

		void addTask(
			{
				completed: false,
				deadline,
				title,
				id: nanoid()
			},
			dispatch,
		);
	}, [deadline, title]);
	// type error occurred DateFnsUtils
	return (
		<div className={classes.root}>
			<TextField
				id="standard-required"
				type="search"
				label="Task Title"
				variant="outlined"
				onChange={onChangeTaskName} />
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					disableToolbar
					inputVariant="outlined"
					variant="inline"
					value={deadline}
					onChange={onChangeDeadline}
					label="deadline"
					format="yyyy/MM/dd" />
			</MuiPickersUtilsProvider>
			<IconButton aria-label="delete" onClick={onClickAddButton}>
				<AddIcon />
			</IconButton>

		</div>
	)
}

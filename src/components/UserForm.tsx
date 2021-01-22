import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAction } from '../actions/UserAction';
import { IUser, IState } from '../states';
import { CountButton, TextBox } from '../components';


export const UserForm: React.FC = () => {
	const { name, count } = useSelector<IState, IUser>(a => a.user);
	const dispatch = useDispatch();

	const onNameChange = useCallback((value: string) => {
		dispatch(changeUserAction({name: value}))
	}, []);

	const onCountClick = useCallback(() => {
		dispatch(changeUserAction({count: count + 1}))
	}, [count]);

	return (
		<div>
			<p>
				<TextBox value={name} type="text" label="username" onChangeText={onNameChange} />
			</p>
			<p>name: {name}</p>
			<p>
				<CountButton count={count} label="access" onClick={onCountClick}/>
			</p>
		</div>
	)
}

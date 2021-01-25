import React, { ChangeEvent, useCallback,  useState} from 'react';
import { useDispatch } from 'react-redux';
// import styled from 'styled-components';
import { styled } from '../FoundationStyle';
import { addTaskAction } from '../actions';


const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	margin: 1em 0;
	width: 100%;
`;


const TextBox = styled.input`
	box-sizing: border-box;
	width: 100%;
`;


const TaskNameBox = styled.p`
	flex-grow: 1;
`;


const DeadlineBox = styled.div``;


const AddButton = styled.button`
	background-color: ${(p): string => p.theme.SECONDARY_1_3};
	border-radius: 50%;
	color: white;
	display: block;
	font-size: 150%;
	height: 40px;
	padding: 0;
	width: 40px;
`;


export const AddTask: React.FC = () => {
	const dispatch = useDispatch();

	const [deadline, setDeadline] = useState<Date>(
		new Date()
	);

	const [title, setTitle] = useState<string>('');
	const onChangeTaskName = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setTitle(e.currentTarget.value);
		},
		[]
	);

	const onChangeDeadline = useCallback((date: Date) => {
		setDeadline(date)
	}, [])

	const onClickAddButton = useCallback(() => {
		dispatch(
			addTaskAction({
				completed: false,
				deadline,
				title,
				id: ''
			})
		)
	}, []);
	return (
		<Container>
			<TaskNameBox>
				<label>
					task name
					<TextBox type="text" value={title} onChange={onChangeTaskName} />
				</label>
			</TaskNameBox>
			<DeadlineBox>
				<label>
					dead line
				</label>
			</DeadlineBox>
			<AddButton onClick={onClickAddButton}>+</AddButton>
		</Container>
	)
};

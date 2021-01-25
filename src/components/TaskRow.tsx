import React, { useCallback, useMemo, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskAction, toggleCompleteAction } from '../actions';
import { ITask } from '../states';
import { styled } from '../FoundationStyle';

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
`;

const TaskCheck = styled.p`
	color: ${(p): string => p.theme.SECONDARY_1_3};
	font-size: 150%;
`;

const TaskBody = styled.div`
	display: flex;
`;

const TaskRemove = styled.div`
	flex-grow: 0;
`;

const TaskName = styled.div`
	font-size: 120%;
`;

const Deadline = styled.div``;


export const TaskRow: React.FC<{ data:ITask }> = (props) => {
	const { data } = props;
	const dispatch = useDispatch();

	const expiration = useMemo(() => {
		return new Date() < data.deadline || data.completed;
	}, [data.deadline, data.completed]);

	const deadlineString = useMemo(() => {
		return data.deadline
	}, [data.deadline])

	const onRowCLick = useCallback(() => {
		dispatch(toggleCompleteAction(data.id))
	}, [data.id])

	const onDeleteClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			dispatch(deleteTaskAction(data.id));
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

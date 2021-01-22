import React from 'react';

interface IProps {
	count: number;
	label: string;
	onClick: () => void;
}

export const CountButton: React.FC<IProps> = props => {
	return (
		<>
			<button onClick={props.onClick}>{props.label}</button>
			<span style={{ marginLeft: '1em' }}>{props.count}</span>
		</>
	);
};

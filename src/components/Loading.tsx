import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

interface IProps {
  shown: boolean;
}

export const Loading: React.FC<IProps> = props => {
	if (!props.shown) {
		return null;
	}
	return (
		<LinearProgress color="secondary"/>
	);
	};

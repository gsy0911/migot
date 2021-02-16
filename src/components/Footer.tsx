import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const Copyright: React.FC = () => {
	return (
		<Typography variant="body2" color="inherit">
			<Link to={"/"} color="inherit">migot</Link>
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const useStyles = makeStyles( (theme) => ({
	root: {
		display: 'flex',
		minHeight: '100vh',
		flexDirection: 'column'
	},
	footer: {
		backgroundColor: theme.palette.primary.main,
		color: "white",
		padding: theme.spacing(1, 2),
		marginTop: 'auto',
	}
}));

export const StickyFooter: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Copyright />
				</Container>
			</footer>
		</div>
	)
}

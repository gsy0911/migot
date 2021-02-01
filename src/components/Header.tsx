import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link }  from 'react-router-dom';


const useStyles = makeStyles( (theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	}
}));


export const HeaderAppBar: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						migot
					</Typography>

					<Link to={"/task"} style={{ color: '#FFF', padding: 8}}>TASK</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}

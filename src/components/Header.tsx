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

	// officially recommened place second `<Toolbar />`, to avoid hide other components by fixed-AppBar
	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						migot
					</Typography>

					<Link to={"/task"} style={{ color: '#FFF', padding: 8}}>TASK</Link>
					<Link to={"/secrets"} style={{ color: '#FFF', padding: 8}}>SECRETS</Link>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}

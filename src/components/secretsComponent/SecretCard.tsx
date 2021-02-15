import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Card, CardActions, CardContent, Chip, Grid, IconButton, Popover, Typography } from '@material-ui/core';
import { ISecretData } from '../../states';


const useStyles = makeStyles( (theme) => ({
	root: {
		minWidth: 275,
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardContent: {
		flexGrow: 1,
	},
	cardChips: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
		  margin: theme.spacing(0.5),
		},
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
		  duration: theme.transitions.duration.shortest,
		}),
	},
	  expandOpen: {
		transform: 'rotate(180deg)',
	},
}));


export const SecretCard: React.FC<ISecretData> = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h5" component="h2">
						{props.name}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}

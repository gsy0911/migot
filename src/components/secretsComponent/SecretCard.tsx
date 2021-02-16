import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, Grid, Typography, Modal, Fade, Backdrop } from '@material-ui/core';
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
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));


export const SecretCard: React.FC<ISecretData> = (props) => {
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpen = () => {
		setModalOpen(true);
	};

	const handleClose = () => {
		setModalOpen(false);
	};
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardActionArea onClick={handleOpen}>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant="h5" component="h2">
							{props.name}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={modalOpen}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{timeout: 500}}>
					<Fade in={modalOpen}>
						<div className={classes.paper}>
							<h2 id="transition-modal-title">{props.name}</h2>
							<p id="transition-modal-description">{props.primaryId}</p>
						</div>
					</Fade>
				</Modal>
			</Card>
		</Grid>
	)
}

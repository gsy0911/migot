import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import { Link }  from 'react-router-dom';
/** icons */
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RoomIcon from '@material-ui/icons/Room';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 200;
const useStyles = makeStyles( (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.enteringScreen,
		}),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	listItem: {
		display: 'flex'
	}
}));

/**
 * @param props
 * @see https://material-ui.com/ja/guides/composition/#react-router
 */
const ListItemLink: React.FC<{icon: React.ReactElement, primary: string, to: string}> = (props) => {
	const { icon, primary, to } = props;

	const CustomLink = React.useMemo(() =>
		React.forwardRef((linkProps, ref) => (
		  	<Link to={to} {...linkProps} />
		)),
	 	[to],
	);

	return (
		<ListItem button component={CustomLink}>
		  <ListItemIcon>{icon}</ListItemIcon>
		  <ListItemText primary={primary} />
		</ListItem>
	);
}

export const HeaderAppBar: React.FC = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
	  setOpen(true);
	};

	const handleDrawerClose = () => {
	  setOpen(false);
	};

	// officially recommened place second `<Toolbar />`, to avoid hide other components by fixed-AppBar
	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={clsx(classes.appBar, {
          			[classes.appBarShift]: open,
        		})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
						[classes.hide]: open,
						})}
					>
						<MenuIcon />
          			</IconButton>
					<Typography variant="h6" className={classes.title}>
						migot
					</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
				}}
			>
				<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
				</div>
				<Divider />
				<List>
					<ListItemLink icon={<ListAltIcon />} primary={'TASK'} to={'/task'}/>
					<ListItemLink icon={<LockIcon />} primary={'SECRETS'} to={'/secrets'}/>
				</List>
				<Divider />
				<List>
					<ListItemLink icon={<AttachFileIcon />} primary={'SNIPPETS'} to={'/snippets'}/>
					<ListItemLink icon={<RoomIcon />} primary={'VISITED'} to={'/visited'}/>
				</List>
				<Divider />
				<List>
					<ListItemLink icon={<SettingsIcon />} primary={'SETTING'} to={'/setting'}/>
				</List>
			</Drawer>
		</div>
	);
}

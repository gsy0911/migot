import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import { HeaderAppBar, StickyFooter } from './components';
import { TaskListContainer } from './components/TaskList';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
	palette: {
	  text: {
		//   default: "#000000",
		  primary: "#FFFFFF",
		  secondary: "#FFFFFF"
	  },
	  primary: {
		// light: will be calculated from palette.primary.main,
		main: '#008000',
		// dark: will be calculated from palette.primary.main,
		// contrastText: will be calculated to contrast with palette.primary.main
	  },
	  secondary: {
		// light: '#778000',
		main: '#708070',
		// dark: will be calculated from palette.secondary.main,
		// contrastText: '#ffa500',
	  },
	  // Used by `getContrastText()` to maximize the contrast between
	  // the background and the text.
	  contrastThreshold: 3,
	  // Used by the functions below to shift a color's luminance by approximately
	  // two indexes within its tonal palette.
	  // E.g., shift from Red 500 to Red 300 or Red 700.
	  tonalOffset: 0.2,
	},
  });

const container = document.getElementById('contents');

ReactDOM.render(
	<div className="main">
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				{/* <GlobalStyle /> */}
				<HashRouter>
					<HeaderAppBar/>
					<div>
						<Route path="/task" exact component={TaskListContainer} />
					</div>
					<StickyFooter />
				</HashRouter>
			</ThemeProvider>
		</Provider>
	</div>,
	container
);

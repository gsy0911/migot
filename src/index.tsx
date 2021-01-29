import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './FoundationStyle';
import { store } from './store';
import { TaskListContainer } from './components/TaskList';

const container = document.getElementById('contents');

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<HashRouter>
				<div>
					<Route path="/" exact component={TaskListContainer} />
				</div>
			</HashRouter>
		</ThemeProvider>
	</Provider>,
	container
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { UserForm } from './components';
import { store } from './store';

const container = document.getElementById('contents');

ReactDOM.render(
	<Provider store={store}>
		<UserForm />
	</Provider>,
	container
);

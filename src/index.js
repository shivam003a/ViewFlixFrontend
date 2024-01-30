import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import {store} from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
			<Toaster position='bottom-right' />
		</Provider>
	</HashRouter>
);
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import './styles/index.scss';
import './styles/react-burger-menu.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.register();

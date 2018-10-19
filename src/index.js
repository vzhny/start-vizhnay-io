import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './containers/Layout/Layout';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Layout />, document.getElementById('app'));

serviceWorker.register();

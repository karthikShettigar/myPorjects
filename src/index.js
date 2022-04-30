import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import { reducers } from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const webTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = compose(applyMiddleware(thunk),webTool)(createStore)(reducers);



const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


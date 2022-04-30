
import { Fragment } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Task from './component/task';



function App() {

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <Task/>
        </header>
      </div>
    </Fragment>
  );
}



export default App;

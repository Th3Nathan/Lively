import * as React from 'react';
import './App.css';
import Modals from './modals/Modals';
import Sidebar from './sidebar/Sidebar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Modals />
        <Sidebar />
      </div>
    );
  }
}

export default App;

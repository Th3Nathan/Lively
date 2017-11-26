import * as React from 'react';
import './App.css';
import Modals from './Modals';
import Sidebar from './Sidebar';

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

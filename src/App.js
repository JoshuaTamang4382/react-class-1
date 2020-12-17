// import logo from './logo.svg';
// import './App.css';

import React, {Component} from 'react';
import './App.css';
import MyFirstComponent from './component/myFirstComponent';
import MyThirdComponent from './component/myThirdComponent';
import DigitalClock from './digitalClock.js';
import Routes from "./routes";
import ApiCall from "./apiCall";
import {theme} from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

export default class App extends Component{
    render() {
      return (
        // <div className="headerName">
        //     {/* <MyThirdComponent name="Joshua"/> */}
        //     <MyFirstComponent/>
        // </div>
        <div>
          <ThemeProvider theme={theme}>
            <Routes/>
          </ThemeProvider>
        </div>
      );
    }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


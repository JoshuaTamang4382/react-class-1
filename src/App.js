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
import firebase from 'firebase';
// https://api.instantwebtools.net/v1/passenger?page=0&size=10

export default class App extends Component{

    constructor(props){
      super(props)
      this.state={
        initializing:true
      }
    }
    
    componentDidMount(){
      this.initFireBase();
    }

    initFireBase=()=>{
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyBRs_3VOBWMfKiVKVBRW7l9Bsl0ZTfH52g",
        authDomain: "user-feedback-8ab03.firebaseapp.com",
        projectId: "user-feedback-8ab03",
        storageBucket: "user-feedback-8ab03.appspot.com",
        messagingSenderId: "866285511275",
        appId: "1:866285511275:web:3dafad4f0830022894072e",
        measurementId: "G-HWNTL3QZH1"
      };
      firebase.initializeApp(firebaseConfig);
      this.setState({
        initializing:false
      })
    }
    render() {
      return (
        // <div className="headerName">
        //     {/* <MyThirdComponent name="Joshua"/> */}
        //     <MyFirstComponent/>
        // </div>
        <div>
          {this.state.initializing?'Please wait':
          <ThemeProvider theme={theme}>
            <Routes/>
          </ThemeProvider>
          }
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


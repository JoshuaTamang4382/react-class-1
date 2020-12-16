import React, {Component} from 'react';
import MySecondComponent from './mySecondComponent';
import {Link} from "react-router-dom";

class MyFirstComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            address:"",
            number:""
        };
        // this.handleChange=this.handleChange.bind(this);
        }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    };

    callFromSecondComponent=(name)=>{
        alert('This is your boss'+name);
    };
    render() {
        return (
            <div>
                    <input type="text" name="username" 
                    onChange={this.handleChange}></input>
                    <input type="text" name="address" 
                    onChange={this.handleChange}></input>
                    <input type="number" name="number" 
                    onChange={this.handleChange}></input>
                    {/* <br/> User Name : {this.state.username}
                    <br/> Address : {this.state.address}
                    <br/> Number : {this.state.number} */}
                    <MySecondComponent
                        userName={this.state.username}
                        address={this.state.address}
                        number={this.state.number}
                        test="This is Test"
                        callFromSecondComponent={this.callFromSecondComponent}/>
                    
                    <Link 
                        to={{
                            pathname: "/clock",
                            search: "?sort=name",
                            hash: "#the-hash",
                        }}>
                        <button>Go to Digital Clock</button>
                    </Link>
            </div>
        );
    }
}

export default MyFirstComponent;
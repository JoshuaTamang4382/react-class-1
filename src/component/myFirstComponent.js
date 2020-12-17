import React, {Component} from 'react';
import MySecondComponent from './mySecondComponent';
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";

class MyFirstComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            address:"",
            number:""
        };
        console.log(this.props);
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
                        <button
                        onClick={()=>
                        this.props.history.push('./clock',
                        {name:this.state.username}
                        )
                        }
                        >Change Route programmatically</button>
                        <br/>
                        <button onClick={()=>
                        this.props.history.push('dynamicRoute/book/23423423_e4h4e2')}>Dynamic Route</button>
            </div>
        );
    }
}

export default withRouter(MyFirstComponent);
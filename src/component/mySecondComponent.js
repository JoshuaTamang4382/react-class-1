import React, {Component} from 'react';
import MyThirdComponent from './myThirdComponent';
import {withRouter} from "react-router-dom";

class MySecondComponent extends Component {
    constructor(props){
        super(props);
            console.log(this.props);
        }
    render() {
        return (
            <div>
                {this.props.match.params.id}<br/>
                {this.props.match.params.value}
                <br/>
                UserName from Component 1:
                {this.props.userName}<br/>
                Address from Component 1:
                {this.props.address}<br/>
                Number from Component 1:
                {this.props.number}<br/>
                {this.props.test}<br/>
                <button onClick={()=>this.props.callFromSecondComponent('Joshua')}>Click Here</button>
            </div>
        );
    }
}

export default withRouter(MySecondComponent);

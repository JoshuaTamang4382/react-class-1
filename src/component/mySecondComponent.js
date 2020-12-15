import React, {Component} from 'react';
import MyThirdComponent from './myThirdComponent';

class MySecondComponent extends Component {
    render() {
        return (
            <div>
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

export default MySecondComponent;
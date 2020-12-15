import React, {Component} from 'react';

class MyThirdComponent extends Component {

    componentDidMount(){
        console.log('this is component did mount');
    }
    
    componentWillReceiveProps(nextProps, nextContext){
        console.log(nextProps);
        console.log(nextContext);
    }
    componentWillUnmount() {
        console.log('this is unmount')
    }
    render() {
        return (
            <div>
                This is My Third Component
            </div>
        );
    }
}

export default MyThirdComponent;
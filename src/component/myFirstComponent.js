import React, {Component} from 'react';
import MySecondComponent from './mySecondComponent';

class MyFirstComponent extends Component {
    render() {
        return (
            <div>
                This is My First Component
                <MySecondComponent/>
            </div>
        );
    }
}

export default MyFirstComponent;
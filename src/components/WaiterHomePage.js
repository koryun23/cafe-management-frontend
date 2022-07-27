import React from 'react';
import Menu from './Menu.js';
import WaiterMenu from './WaiterMenu.js';

class WaiterHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

    render() {
        return (
            <div>
                <WaiterMenu />
                <h1>Waiter home page</h1>
            </div>
        );
    }
}

export default WaiterHomePage;
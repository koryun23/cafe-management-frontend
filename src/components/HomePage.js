import React from 'react';
import '../css/HomePage.css'
import ManagerHomePage from './ManagerHomePage.js';
import WaiterHomePage from './WaiterHomePage.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.userType === 'MANAGER' ? <ManagerHomePage /> : <WaiterHomePage/>
    }
}

export default HomePage;

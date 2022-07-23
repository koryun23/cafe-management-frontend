import React from 'react';
import '../css/HomePage.css'
import ManagerPage from './ManagerPage.js';
import WaiterHomePage from './WaiterHomePage.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.userType === 'MANAGER' ? <ManagerPage /> : <WaiterHomePage/>
    }
}

export default HomePage;

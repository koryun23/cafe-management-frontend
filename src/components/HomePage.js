import React from 'react';
import { Redirect } from 'react-router-dom';
import ManagerHomePage from './ManagerHomePage.js';
import WaiterHomePage from './WaiterHomePage.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const token = localStorage.getItem("token");
        if(!token) {
            return <Redirect to="/login"/>
        }
        console.log(token);
        const username = localStorage.username;
        const firstName = localStorage.firstName;
        const lastName = localStorage.lastName;
        const role = localStorage.role;
        if(role === 'MANAGER') {
            return <ManagerHomePage username={username}
                                    firstName={firstName} 
                                    lastName={lastName}/>
        }
        return <WaiterHomePage username={username}
                               firstName={firstName}
                               lastName={lastName}/>
    }
}

export default HomePage;

import React from 'react';
import Menu from './Menu.js';
import WaiterMenu from './WaiterMenu.js';
import ProfileSidenav from './ProfileSidenav.js';
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
                <ProfileSidenav username={this.props.username}
                                firstName={this.props.firstName}
                                lastName={this.props.lastName}
                                userRole="WAITER"/>
                <div className="main">
                    <h2>Welcome, {this.props.firstName}</h2>
                    <p>Below are some of the actions you can perform.</p>
                    <hr></hr>
                </div>
            </div>
        );
    }
}

export default WaiterHomePage;
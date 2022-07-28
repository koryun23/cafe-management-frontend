import React from 'react';
import WaiterMenu from './WaiterMenu.js';
import ProfileSidenav from './ProfileSidenav.js';
import Box from './Box.js';
import '../css/WaiterPage.css';

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
                    <div className="box-container">
                        <AllBoxes />
                    </div>
                </div>
            </div>
        );
    }
}

function AllBoxes(props) {
    return [
        <Box imageClassName="table-image"
             text="TABLES"
             path="/tables-to-waiters"
             color="red"
             buttonText="View Assigned Tables»" />,
        <Box imageClassName="order-image"
             text="ORDERS"
             path="/orders"
             color="green"
             buttonText="View»" />,
    ]
}
export default WaiterHomePage;
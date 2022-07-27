import React from 'react';
import "../css/ManagerPage.css";
import ManagerMenu from './ManagerMenu';
import ProfileSidenav from './ProfileSidenav.js';
import Box from './Box.js';

class ManagerHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <ManagerMenu />
                <ProfileSidenav username="john11"
                                firstName="John"
                                lastName="Smith" 
                                userRole="MANAGER"/>
                <div className="main align-items-center justify-content-center">
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
        <Box text="USERS" 
             imageClassName="user-image"
             path="/users" 
             color="yellow"
             buttonText="View»" />,
        <Box text="PRODUCTS" 
             imageClassName="product-image" 
             path="/products" 
             color="green"
             buttonText="View»" />,
        <Box text="TABLES" 
             imageClassName="table-image" 
             color="red" 
             path="/tables"
             buttonText="View»" />
    ];
}


export default ManagerHomePage;
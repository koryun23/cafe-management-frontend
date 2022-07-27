import React from 'react';
import "../css/ManagerPage.css";
import ManagerMenu from './ManagerMenu';
import ProfileSidenav from './ProfileSidenav.js';

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
             color="yellow"/>,
        <Box text="PRODUCTS" 
             imageClassName="product-image" 
             path="/products" 
             color="green"/>,
        <Box text="TABLES" 
             imageClassName="table-image" 
             color="red" 
             path="/tables"/>
    ];
}

function Box(props) {
    return (
        <div className={"box box-" + props.color}>
            <div className={props.imageClassName}></div>
            <p className="box-description">{props.text}</p>
            <a className={"box-button box-button-" + props.color}
                    href={props.path}>
                View»
            </a>
            
        </div>
    );
}



export default ManagerHomePage;
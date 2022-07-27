import React from 'react';
import "../css/ManagerPage.css";
import ManagerMenu from './ManagerMenu';
class ManagerHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <ManagerMenu />
                <div className="sidenav">
                    <div className="manager-image"></div>
                    <Profile firstName={this.props.firstName}
                             lastName={this.props.lastName}
                             username={this.props.username}/>
                </div>
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

function Profile(props) {
    return (
        <div className="profile">
            <h3 className="username">{props.username}</h3>
            <p className="full-name">{props.firstName + " " + props.lastName}</p>
        </div>
    );
}

export default ManagerHomePage;
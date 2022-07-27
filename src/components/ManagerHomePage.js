import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
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
                        <AllBoxes onUsersClick={this.props.onUsersClick} 
                                  onProductsClick={this.props.onProductsClick} 
                                  onTablesClick={this.props.onTablesClick}/>
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
             onClick={props.onUsersClick} 
             path="/users" 
             color="yellow"/>,
        <Box text="PRODUCTS" 
             imageClassName="product-image" 
             onClick={props.onProductsClick} 
             path="/products" 
             color="green"/>,
        <Box text="TABLES" 
             imageClassName="table-image" 
             color="red" 
             onClick={props.onTablesClick}
             path="/tables"/>
    ];
}

function Box(props) {
    return (
        <div className={"box box-" + props.color}>
            <div className={props.imageClassName}></div>
            <p className="box-description">{props.text}</p>
            <Link className={"box-button box-button-" + props.color}
                    onClick={props.onClick} 
                    to={props.path}>
                View»
            </Link>
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

function isHomePage(state) {
    return !state.showAddProductsForm && 
           !state.showAddTablesForm && 
           !state.showAddUsersForm &&
           !state.showAssignForm &&
           !state.showViewProducts;
}

export default Home;
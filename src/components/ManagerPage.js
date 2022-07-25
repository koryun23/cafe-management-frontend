import React from 'react';
import AssignForm from './AssignForm.js';
import Menu from './Menu.js';
import UserForm from './UserForm.js';
import TableForm from './TableForm.js';
import ProductsRegistrationForm from './ProductsForm.js';
import ViewProducts from './ViewProducts.js';
import BackgroundImage from './BackgroundImage.js';
import ViewUsers from './ViewUsers.js';
import {Link} from 'react-router-dom'; 
import '../css/ManagerPage.css';

class ManagerPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleAddUsersClick = this.handleAddUsersClick.bind(this);
        this.handleAddTablesClick = this.handleAddTablesClick.bind(this);
        this.handleAssignClick = this.handleAssignClick.bind(this);
        this.handleAddProductsClick = this.handleAddProductsClick.bind(this);
        this.handleViewProductsClick = this.handleViewProductsClick.bind(this);
        this.handleViewUsersClick = this.handleViewUsersClick.bind(this);
        this.state = {
            showAddUsersForm : false,
            showAddTablesForm : false,
            showAssignForm : false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: true,
            showProductsBox: true,
            showTablesBox: true
        };
        
        this.menuItems = [
            {path: '', text: 'Users'},
            {path: '', text: 'Tables'},
            {path: '', text: 'Products'},
        ];

        this.usersDropdownItems = [
            {path: '/users/register', text: 'Add Users', onClick: this.handleAddUsersClick},
            {path: '/users', text: 'View Users', onClick: this.handleViewUsersClick}
        ];

        this.tablesDropdownItems = [
            {path: '/tables/register', text: 'Add Tables', onClick: this.handleAddTablesClick},
            {path: '/tables-to-waiters/assign', text: 'Assign', onClick: this.handleAssignClick}
        ];

        this.productsDropdownItems = [
            {path: '/products/register', text: 'Add Products', onClick: this.handleAddProductsClick},
            {path: '/products', text: 'View Products', onClick: this.handleViewProductsClick}
        ];

        this.dropdownItems = [
            this.usersDropdownItems,
            this.tablesDropdownItems,
            this.productsDropdownItems
        ]
    }

    handleHomeClick(event) {
        console.log("home");
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: true,
            showProductsBox: true,
            showTablesBox: true
        });

    }

    handleAddUsersClick(event) {
        console.log("users");
        this.setState({
            showAddUsersForm: true,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    handleAddTablesClick(event) {
        console.log("tables");
        this.setState({
            showAddTablesForm: true,
            showAddUsersForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    handleAssignClick(event) {
        console.log("assign");
        this.setState({
            showAssignForm: true,
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    handleAddProductsClick(event) {
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: true,
            showViewProducts: false,
            showViewUsers: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        })
    }

    handleViewProductsClick(event) {
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: true,
            showViewUsers: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        })
    }

    handleViewUsersClick(event) {
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: true,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className='ManagerPage'>
                {!isHomePage(this.state) && !this.state.showViewProducts && <BackgroundImage />}
                <Menu items={this.menuItems} dropdownItems={this.dropdownItems} onHomeClick={this.handleHomeClick}/>
                <Form state={this.state} 
                      onUsersClick={this.handleViewUsersClick} 
                      onProductsClick={this.handleViewProductsClick}/>
            </div>
        );
    }
}

function Form(props) {
    if(props.state.showAddTablesForm) {
        console.log("show add tables");
        return <TableForm />
    }
    if(props.state.showAddUsersForm) {
        console.log("show add users")
        return <UserForm />
    }
    if(props.state.showAssignForm) {
        console.log("show assign");
        return <AssignForm />
    }
    if(props.state.showAddProductsForm) {
        console.log("show add products");
        return <ProductsRegistrationForm />;
    }
    if(props.state.showViewProducts) {
        console.log("show view products");
        return <ViewProducts />;
    }
    if(props.state.showViewUsers) {
        console.log("show view users");
        return <ViewUsers />;
    }
    console.log("show home");
    return <Home username="john11"
                 firstName="John"
                 lastName="Smith"
                 onUsersClick={props.onUsersClick} 
                 onProductsClick={props.onProductsClick}/>
}

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
                                  onProductsClick={this.props.onProductsClick}/>
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
             path="/users"/>,
        <Box text="PRODUCTS" 
             imageClassName="product-image" 
             onClick={props.onProductsClick} 
             path="/products"/>,
        <Box text="TABLES" 
             imageClassName="table-image"/>
    ];
}

function Box(props) {
    return (
        <div className="box">
            <div className={props.imageClassName}></div>
            <p className="box-description">{props.text}</p>
            <Link className="box-button"
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

export default ManagerPage;
import React from 'react';
import AssignForm from './AssignForm.js';
import Menu from './Menu.js';
import UserForm from './UserForm.js';
import TableForm from './TableForm.js';
import ProductsRegistrationForm from './ProductsForm.js';
import ViewProducts from './ViewProducts.js';
import BackgroundImage from './BackgroundImage.js';
import ViewUsers from './ViewUsers.js';
import ViewTables from './ViewTables.js';
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
        this.handleViewTablesClick = this.handleViewTablesClick.bind(this);
        this.state = {
            showAddUsersForm : false,
            showAddTablesForm : false,
            showAssignForm : false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showViewTables: false,
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
            {path: '/tables-to-waiters/assign', text: 'Assign', onClick: this.handleAssignClick},
            {path: '/tables', text: 'View Tables', onClick: this.handleViewTablesClick}
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
            showViewTables: false,
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
            showViewTables: false,
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
            showViewTables: false,
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
            showViewTables: false, 
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
            showViewTables: false,
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
            showViewTables: false,
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
            showViewTables: false,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    handleViewTablesClick() {
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false,
            showViewProducts: false,
            showViewUsers: false,
            showViewTables: true,
            showUsersBox: false,
            showProductsBox: false,
            showTablesBox: false
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className='ManagerPage'>
                {/* {!isHomePage(this.state) && !this.state.showViewProducts && <BackgroundImage />} */}
                {/* <Menu items={this.menuItems} dropdownItems={this.dropdownItems} onHomeClick={this.handleHomeClick}/>
                <Form state={this.state} 
                      onUsersClick={this.handleViewUsersClick} 
                      onProductsClick={this.handleViewProductsClick} 
                      onTablesClick={this.handleViewTablesClick}/> */}
            </div>
        );
    }
}


export default ManagerPage;
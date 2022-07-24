import React from 'react';
import AssignForm from './AssignForm.js';
import Menu from './Menu.js';
import UserForm from './UserForm.js';
import TableForm from './TableForm.js';
import ProductsRegistrationForm from './ProductsForm.js';

class ManagerPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleAddUsersClick = this.handleAddUsersClick.bind(this);
        this.handleAddTablesClick = this.handleAddTablesClick.bind(this);
        this.handleAssignClick = this.handleAssignClick.bind(this);
        this.handleAddProductsClick = this.handleAddProductsClick.bind(this);
        this.state = {
            showAddUsersForm : false,
            showAddTablesForm : false,
            showAssignForm : false,
            showAddProductsForm: false
        };
        
        this.menuItems = [
            {path: '', text: 'Users'},
            {path: '', text: 'Tables'},
            {path: '', text: 'Products'}
        ];

        this.usersDropdownItems = [
            {path: '/users/register', text: 'Add Users', onClick: this.handleAddUsersClick}
        ];

        this.tablesDropdownItems = [
            {path: '/tables/register', text: 'Add Tables', onClick: this.handleAddTablesClick},
            {path: '/tables-to-waiters/assign', text: 'Assign', onClick: this.handleAssignClick}
        ];

        this.productsDropdownItems = [
            {path: '/products/register', text: 'Add Products', onClick: this.handleAddProductsClick}
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
            showAddProductsForm: false
        });

    }

    handleAddUsersClick(event) {
        console.log("users");
        this.setState({
            showAddUsersForm: true,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: false
        });
    }

    handleAddTablesClick(event) {
        console.log("tables");
        this.setState({
            showAddTablesForm: true,
            showAddUsersForm: false,
            showAssignForm: false,
            showAddProductsForm: false
        });
    }

    handleAssignClick(event) {
        console.log("assign");
        this.setState({
            showAssignForm: true,
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAddProductsForm: false
        });
    }

    handleAddProductsClick(event) {
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false,
            showAddProductsForm: true
        });
    }
    render() {
        console.log(this.state);
        return (
            <div className='ManagerPage'>
                <Menu items={this.menuItems} dropdownItems={this.dropdownItems} onHomeClick={this.handleHomeClick}/>
                <Form state={this.state} />
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
    console.log("show home");
}

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Profile username="john11" 
                        firstName="John" 
                        lastName="Smith" 
                        role="MANAGER" />);
    }
}

function Profile(props) {
    return (
        <div className="user-add-form">
            <h2>{props.role}</h2>
            <h3>{props.username}</h3>
            <p>{props.firstName + " " + props.lastName}</p>
        </div>
    );
}
export default ManagerPage;
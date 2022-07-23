import React from 'react';
import AssignForm from './AssignForm.js';
import Menu from './Menu.js';
import UserForm from './UserForm.js';
import TableForm from './TableForm.js';
import ProductsForm from './ProductsForm.js';

class ManagerHomePage extends React.Component {
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
            {path: '/home', text: 'Home', onClick: this.handleHomeClick},
            {path: '/users/register', text: 'Add Users', onClick: this.handleAddUsersClick},
            {path: '/tables/register', text: 'Add Tables', onClick: this.handleAddTablesClick},
            {path: '/tables-to-waiters/assign', text: 'Assign', onClick: this.handleAssignClick},
            {path: '/products/register', text: 'Add Products', onClick: this.handleAddProductsClick}
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
            <div className='ManagerHomePage'>
                <Menu items={this.menuItems}/>
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
        return <ProductsForm />
    }
    return <p>Home page</p>
}

export default ManagerHomePage;
import React from 'react';
import AssignForm from './AssignForm.js';
import Menu from './Menu.js';
import UserForm from './UserForm.js';
import TableForm from './TableForm.js';

class ManagerHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleAddUsersClick = this.handleAddUsersClick.bind(this);
        this.handleAddTablesClick = this.handleAddTablesClick.bind(this);
        this.handleAssignClick = this.handleAssignClick.bind(this);
        this.state = {
            showAddUsersForm : false,
            showAddTablesForm : false,
            showAssignForm : false
        };
        this.menuItems = [
            {path: '/home', text: 'Home', onClick: this.handleHomeClick},
            {path: '/users/register', text: 'Add Users', onClick: this.handleAddUsersClick},
            {path: '/tables/register', text: 'Add Tables', onClick: this.handleAddTablesClick},
            {path: '/tables-to-waiters/assign', text: 'Assign', onClick: this.handleAssignClick}
        ]
    }

    handleHomeClick(event) {
        console.log("home");
        this.setState({
            showAddUsersForm: false,
            showAddTablesForm: false,
            showAssignForm: false
        })
    }

    handleAddUsersClick(event) {
        console.log("users");
        this.setState({
            showAddUsersForm: true,
            showAddTablesForm: false,
            showAssignForm: false
        });
    }

    handleAddTablesClick(event) {
        console.log("tables");
        this.setState({
            showAddTablesForm: true,
            showAddUsersForm: false,
            showAssignForm: false
        });
    }

    handleAssignClick(event) {
        console.log("assign");
        this.setState({
            showAssignForm: true,
            showAddUsersForm: false,
            showAddTablesForm: false
        });
    }

    render() {
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
}

export default ManagerHomePage;
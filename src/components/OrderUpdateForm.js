import React from 'react';
import Input from './Input.js';
import Submit from './Submit.js';

class OrderUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: '',
            status: '',
            waiterUsername: ''
        }
        this.handleTableIdChange = this.handleTableIdChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleWaiterUsernameChange = this.handleWaiterUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTableIdChange(tableId) {
        this.setState({tableId: [tableId]});
    }

    handleStatusChange(status) {
        this.setState({status: [status]});
    }

    handleWaiterUsernameChange(username) {
        this.setState({waiterUsername: [username]});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({
            tableId: '',
            status: '',
            waiterUsername: '',
        });
    }

    render() {
        return (
            <div className="user-add-form">
                <form className="form-group">
                    <Input type="number"
                           name="tableId"
                           placeholder="Table Id"
                           value={this.state.tableId}
                           onChange={this.handleTableIdChange} 
                           label="Table Id" />
                    <Input type="text"
                           placeholder="Status"
                           name="status"
                           value={this.state.status}
                           onChange={this.handleStatusChange}
                           label="Status"/>
                    <Input type="text"
                           placeholder="Waiter Username"
                           name="waiter-username"
                           value={this.state.waiterUsername} 
                           onChange={this.handleWaiterUsernameChange}
                           label="Waiter Username" />
                    <Submit onSubmit={this.handleSubmit} value="Update Order"/>
                </form>
            </div>
        );
    }
}

export default OrderUpdateForm;
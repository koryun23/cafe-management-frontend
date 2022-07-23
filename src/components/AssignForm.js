import React from 'react';
import Input from './Input.js';
import Submit from './Submit.js';

class AssignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: '', waiterUsername: ''
        }
        this.handleTableIdChange = this.handleTableIdChange.bind(this);
        this.handleWaiterUsernameChange = this.handleWaiterUsernameChange.bind(this);
    }

    handleTableIdChange(id) {
        this.setState({tableId : [id]});
    }

    handleWaiterUsernameChange(waiterUsername) {
        this.setState({waiterUsername : [waiterUsername]});
    }

    render() {
        return (
            <div className='user-add-form'>
                <form className="form-group">
                    <Input type="number"
                        name="tableId"
                        placeholder="Table Id"
                        value={this.state.tableId}
                        onChange={this.handleTableIdChange} 
                        label="Table Id" />
                    <Input type="text"
                        name="waiter-username"
                        placeholder="Waiter Username"
                        value={this.state.waiterUsername}
                        onChange={this.handleWaiterUsernameChange} 
                        label="Waiter Username" />
                    <Submit onSubmit={this.handleSubmit} value="Add"/>
                </form>
            </div>
        );
    }
}

export default AssignForm;
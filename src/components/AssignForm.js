import axios from 'axios';
import React from 'react';
import ErrorMessage from './ErrorMessage.js';
import Input from './Input.js';
import Submit from './Submit.js';
import { Redirect } from 'react-router-dom';
const API_URL = "http://localhost:7000/";

class AssignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: '', 
            waiterUsername: '',
            assigned: false,
            errorMessages: []
        }
        this.handleTableIdChange = this.handleTableIdChange.bind(this);
        this.handleWaiterUsernameChange = this.handleWaiterUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    static invalidCreds(creds) {
        return (
            !creds.tableId ||
            !creds.waiterUsername
        );
    }

    handleTableIdChange(id) {
        this.setState({tableId : id});
    }

    handleWaiterUsernameChange(waiterUsername) {
        this.setState({waiterUsername : waiterUsername});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(AssignForm.invalidCreds(this.state)) {
            this.setState({errorMessages: ["All fields are required"]});
            return;
        }
        const auth = "Bearer " + localStorage.getItem("token");
        const assignment = axios.post(API_URL + "tables-to-waiters/assign", 
                   {
                    cafeTableId: this.state.tableId,
                    waiterUsername: this.state.waiterUsername
                   }, 
                   {
                    headers: {
                        "Authorization" : auth,
                        "Content-Type" : "application/json"
                    }
                   });
        assignment.then(res => {
            console.log(res.data);
            this.setState({assigned: true});
        }).catch(err => {
            console.log(err);
            this.setState({errorMessages: err.response.data.errors});
        });
    }

    handleClose() {
        this.setState({errorMessages: []});
    }

    render() {
        if(this.state.assigned) {
            return <Redirect to="/home"/>
        }
        return (
            <div className='user-add-form'>
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
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
                    <Submit onSubmit={this.handleSubmit} value="Assign"/>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            </div>
        );
    }
}

export default AssignForm;
import axios from 'axios';
import React from 'react';
import Input from './Input.js';
import Submit from './Submit';
import ErrorMessage from './ErrorMessage.js';
import { Redirect } from 'react-router-dom';
const API_URL = "http://localhost:7000/";

class TableForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeatsChange = this.handleSeatsChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            seats: '', 
            code: '',
            registered: false,
            errorMessages: []
        }
    }

    static invalidCreds(creds) {
        return creds.seats == '' || creds.code == '';
    }

    handleSeatsChange(seats) {
        this.setState({seats: seats});
    }

    handleCodeChange(code) {
        this.setState({code: code});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(TableForm.invalidCreds(this.state)) {
            this.setState({errorMessages: ["All fields are required"]});
            return;
        }
        const auth = "Bearer " + localStorage.getItem("token");
        const tableRegistration = axios.post(API_URL + "tables/register", {
            numberOfSeats: this.state.seats,
            code: this.state.code
        }, {headers: {"Authorization" : auth, "Content-Type" : "application/json"}});
        tableRegistration.then(res => {
            console.log(res.data);
            this.setState({registered: true})
        }).catch(res => {
            console.log(res);
            console.log(this.state);
            this.setState({errorMessages: res.response.data.errors})
        })
    }

    handleClose(event) {
        this.setState({errorMessages: []})
    }

    render() {
        console.log(this.state.errorMessages);
        if(this.state.registered) {
            return <Redirect to="/home"/>
        }
        return (
            <div className='user-add-form'>
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
                    <Input type="number"
                        name="seats"
                        placeholder="Number of seats"
                        value={this.state.seats}
                        onChange={this.handleSeatsChange} 
                        label="Seats" />
                    <Input type="text"
                        name="code"
                        placeholder="Table code"
                        value={this.state.code}
                        onChange={this.handleCodeChange} 
                        label="Table Code" />
                    <Submit onSubmit={this.handleSubmit} value="Add Table"/>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            </div>
        );
    }
}
export default TableForm;
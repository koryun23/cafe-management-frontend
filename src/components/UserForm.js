import React from 'react';
import Input from './Input.js';
import OptionalSelection from './OptionalSelection.js';
import Submit from './Submit.js';
import CloseButton from './CloseButton.js';
import ErrorMessage from './ErrorMessage.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RefreshTokenBox from './RefreshTokenBox.js';

const API_URL = "http://localhost:7000/";

class UserForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            secondName: "",
            roleList: [],
            registered: false,
            errorMessages: [],
            tokenIsExpired: false
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.registerAndRefresh = this.registerAndRefresh.bind(this);
    }

    static invalidCredentials(creds) {
        return (creds.username == "" || 
                 creds.password == "" || 
                 creds.firstName == "" ||
                 creds.secondName == "" ||
                 creds.roleList.length == 0 )
    }

    handleUsernameChange(username) {
        this.setState({username: username});
    }

    handlePasswordChange(password) {
        this.setState({password: password});
    }
    handleFirstNameChange(firstName) {
        this.setState({firstName: firstName});
    }
    handleSecondNameChange(secondName) {
        this.setState({secondName: secondName});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.registerAndRefresh();
    }

    register() {
        console.log(this.state);
        if(UserForm.invalidCredentials(this.state)) {
            this.setState({errorMessages: ["All the fields are required"]});
            return;
        }
        const authorization = "Bearer " + localStorage.getItem("token");
        console.log(authorization);
        const userRegistration = axios.post(API_URL + "users/register", {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            roleList: this.state.roleList
        }, {headers: {"Authorization": authorization, "Content-Type": "application/json"}});
        userRegistration.then(res => {
            console.log(res.data);
            this.setState({registered: true});
        }).catch(err => {
            if(err.response) {
                if(err.response.status == 401) {
                    this.setState({tokenIsExpired: true});
                } else if(err.response.status != 200) {
                    console.log(err.response);
                    this.setState({errorMessages: err.response.data.errors});
                }
            }
        })
    }
    registerAndRefresh() {
        this.register();
        this.setState({tokenIsExpired: false});
    }
    handleClose(event) {
        this.setState({
            errorMessages: [],
        });
    }
    handleRoleChange(event) {
        event.target.isSelected = !event.target.isSelected;
        const roleList = this.state.roleList;
        if(event.target.isSelected) {
            roleList.push(event.target.value);
        }else{
            roleList.splice(roleList.indexOf(event.target.value), 1);
        }
        this.setState({            
            roleList: roleList
        });

        console.log(this.state.roleList);
        console.log(event.target.value + " is selected - " + event.target.isSelected);
    }

    render() {
        console.log(this.state);
        if(!localStorage.getItem("token")) {
            return <Redirect to="/login"/>
        }
        console.log(localStorage.getItem("token"))
        if(this.state.registered) {
            return <Redirect to="/home"/>
        }
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={this.registerAndRefresh}/>
        }
        return (
            <div>
                <div className='user-add-form'>
                    <form className={this.state.errorMessages.length > 0 ? "blur" : ""}>
                        <Input type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange} 
                            label="*Username" />
                        <Input type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange} 
                            label="*Password" />
                        <Input type="text"
                            name="firstName"
                            placeholder="First name"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange} 
                            label="*First Name" />
                        <Input type="text"
                            name="secondName"
                            placeholder="Second name" 
                            value={this.state.secondName}
                            onChange={this.handleSecondNameChange}
                            label="*Second name" />
                        <label style={{paddingLeft: '20px'}}>*Role</label>
                        <OptionalSelection options={
                            [
                                {value: "MANAGER", text: "Manager", selected: false, onChange: this.handleRoleChange, index: 0}, 
                                {value: "WAITER", text: "Waiter", selected: false, onChange: this.handleRoleChange, index: 1}]
                            } />
                        <Submit onSubmit={this.handleSubmit} value="Add"/>
                    </form>
                    
                    {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
                </div>
            </div>
            
            
        );
    }
}

export default UserForm;
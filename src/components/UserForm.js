import React from 'react';
import "../css/UserForm.css";
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
        this.refresh = this.refresh.bind(this);
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
        this.register();
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
    refresh() {
        this.setState({tokenIsExpired: false});
    }
    handleClose(event) {
        this.setState({
            errorMessages: [],
        });
    }
    handleRoleChange(event) {
        event.preventDefault();
        const roleList = this.state.roleList;
        const target = event.target;
        let selectedRole;
        if(target.id == "") {
            selectedRole = event.target.name;
        } else {
            selectedRole = event.target.id;
        }
        console.log(event);
        console.log(selectedRole);
        if(roleList.includes(selectedRole)) {
            roleList.splice(roleList.indexOf(selectedRole), 1);
            this.setState({roleList: roleList});
        } else {
            roleList.push(selectedRole);
            this.setState({roleList: roleList});
        }
        
        // if(event.target.isSelected) {
        //     if(!roleList.includes(event.target.value)){
        //         roleList.push(event.target.value);
        //         this.setState({roleList: roleList});
        //     }
        // }else{
        //     roleList.splice(roleList.indexOf(event.target.value), 1);
        //     this.setState({roleList: roleList})
        // }
        // this.setState({            
        //     roleList: roleList
        // });

        // console.log(this.state.roleList);
        // console.log(event.target.value + " is selected - " + event.target.isSelected);
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
            return <RefreshTokenBox onRefresh={this.refresh}/>
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
                            />
                        <Input type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange} 
                            />
                        <Input type="text"
                            name="firstName"
                            placeholder="First name"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange} 
                            />
                        <Input type="text"
                            name="secondName"
                            placeholder="Second name" 
                            value={this.state.secondName}
                            onChange={this.handleSecondNameChange}
                            />
                        <div className="role-selection">
                            <button className={this.state.roleList.includes("MANAGER") ? "manager-image-button selected" : "manager-image-button non-selected"}
                                    onClick={this.handleRoleChange}
                                    name="MANAGER">
                                <div className="manager-image" id="MANAGER">

                                </div>
                            </button>

                            <button className={this.state.roleList.includes("WAITER") ? "waiter-image-button selected" : "waiter-image-button non-selected"}
                                    onClick={this.handleRoleChange}
                                    name="WAITER">
                                <div className="waiter-image" id="WAITER">

                                </div>
                            </button>

                        </div>

                        {/* <OptionalSelection options={
                            [
                                {value: "MANAGER", text: "Manager", selected: true, onChange: this.handleRoleChange, index: 0}, 
                                {value: "WAITER", text: "Waiter", selected: true, onChange: this.handleRoleChange, index: 1}]
                            } /> */}
                        {/* <Submit onSubmit={this.handleSubmit} value="Add"/> */}
                        <button className='custom-button-registration'
                                onClick={this.handleSubmit}>
                            Register
                        </button>
                    </form>
                    
                    {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
                </div>
            </div>
            
            
        );
    }
}

export default UserForm;
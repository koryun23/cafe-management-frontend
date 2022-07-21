import React from 'react';
import Input from './Input.js';
import OptionalSelection from './OptionalSelection.js';
import Submit from './Submit.js';
import CloseButton from './CloseButton.js';

class UserForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            secondName: "",
            roleList: []
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSecondNameChange = this.handleSecondNameChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleUsernameChange(username) {
        this.setState({username: [username]});
    }

    handlePasswordChange(password) {
        this.setState({password: [password]});
    }
    handleFirstNameChange(firstName) {
        this.setState({firstName: [firstName]});
    }
    handleSecondNameChange(secondName) {
        this.setState({secondName: [secondName]});
    }
    handleSubmit(event) {
        console.log(this.state);
    }
    handleClose(event) {
        this.setState({
            username: "",
            password: "",
            firstName: "",
            secondName: "",
            roleList: []
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
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            roleList: roleList
        });

        console.log(this.state.roleList);
        console.log(event.target.value + " is selected - " + event.target.isSelected);
    }

    render() {
        return (
            <div className='user-add-form'>
                <form>
                    <Input type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange} 
                        label="Username" />
                    <Input type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange} 
                        label="Password" />
                    <Input type="text"
                        name="firstName"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange} 
                        label="First Name" />
                    <Input type="text"
                        name="secondName"
                        placeholder="Second name" 
                        value={this.state.secondName}
                        onChange={this.handleSecondNameChange}
                        label="Second name" />
                    <OptionalSelection options={
                        [
                            {value: "MANAGER", text: "Manager", selected: false, onChange: this.handleRoleChange, index: 0}, 
                            {value: "WAITER", text: "Waiter", selected: false, onChange: this.handleRoleChange, index: 1}]
                        } />
                    <Submit onSubmit={this.handleSubmit} value="Add"/>
                </form>
            </div>
            
        );
    }
}

export default UserForm;
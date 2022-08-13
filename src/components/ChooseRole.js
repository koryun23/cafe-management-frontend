import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class ChooseRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            errorMessages: [],
            redirectToHomePage: false
        }
    }

    handleSelectionChange(event, newRole) {
        this.setState({role: newRole})
    }
    
    handleConfirmLoginClick(event) {
        console.log(this.state.role);
        if(!this.state.role) {
            this.setState({errorMessages: ["No role was selected."]})
            return;
        }
        localStorage.setItem("token", this.props.token);
        localStorage.setItem("username", this.props.username);
        localStorage.setItem("firstName", this.props.firstName);
        localStorage.setItem("lastName", this.props.lastName);
        localStorage.setItem("role", this.state.role);
        this.setState({redirectToHomePage: true});
        //localStorage.setItem("role", this.state.role);
    }
    render() {
        console.log(this.props.availableRoles);
        if(this.state.redirectToHomePage) {
            return <Redirect to="/home"/>
        }
        return (
            <div className='update-box' style={{height: '500px', top: 150}}>
                <button className="close-button" onClick={this.props.onClose}>
                    {<FontAwesomeIcon icon={faClose} size="lg"/>}
                </button>
                <div>
                    <h3 style={{textAlign: 'center'}}>Choose a role</h3>
                    {this.state.errorMessages.length > 0 &&
                <h6 style={{textAlign: 'center', color: 'red', fontSize: '15px'}}>*No role selected</h6>}
                {
                    this.props.availableRoles.map(role => (
                        <div className='form-group'>
                            {/* <label className="status-label">{role}</label> */}
                            <button style={{border: '0ch', backgroundColor: this.state.role!=role ? '#d8d8d8' : '#ffffff59', width: '100%'}} onClick={(event) => this.handleSelectionChange(event, role)}>
                                <div className={role.toLowerCase()+"-image"} ></div>
                            </button>
                            {/* <input style={{display: 'inline'}}
                                type="radio"
                                name={role}
                                value={role}
                                checked={this.state.role===role} 
                                onChange={(event) => this.handleSelectionChange(event)} /> */}
                            <hr></hr>
                        </div>
                    ))
                }       
                </div>


                <button className="update-confirm" onClick={(event) => this.handleConfirmLoginClick(event)} style={{height: '10%'}}>Log in</button>
            </div>
        );
    }
}

export default ChooseRole;
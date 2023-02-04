import axios from 'axios';
import React from 'react';
import "../css/AssignForm.css";
import ErrorMessage from './ErrorMessage.js';
import Input from './Input.js';
import Submit from './Submit.js';
import ViewFreeTablesBox from './ViewFreeTablesBox';
import RefreshTokenBox from './RefreshTokenBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHandPointUp } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { faCalendar, faCalendarCheck, faEdit, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:7000/";

class AssignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTables: [],
            waiter: {},
            assigned: false,
            errorMessages: [],
            showFreeTables: false,
            showWaiters: false,
            tokenIsExpired: false
        }
        this.onTableIdClick = this.onTableIdClick.bind(this);
        this.onWaiterUsernameClick = this.onWaiterUsernameClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.handleCloseTableChoice = this.handleCloseTableChoice.bind(this);
        this.saveSelectedTables = this.saveSelectedTables.bind(this);
    }

    static invalidCreds(creds) {
        return (
            !creds.tableId ||
            !creds.waiterUsername
        );
    }

    componentDidMount() {

    }

    fetchWaiters() {
        const auth = "Bearer " + localStorage.getItem("token");
        const waiterFetchRequest = axios.get(API_URL + "users", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            }, data: {}
        });
        waiterFetchRequest.then(res => {
            this.setState({
                waiters: res.data.userList.filter(user => user.roleList.includes("WAITER")).map(user => (
                    {username: user.username, firstName: user.firstName, secondName: user.secondName, roles: user.roleList}
                ))
            });
        }).catch(err => {
            console.log(err.data);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(AssignForm.invalidCreds(this.state)) {
            this.setState({errorMessages: ["All fields are required"]});
            return;
        }
        const auth = "Bearer " + localStorage.getItem("token");
        this.state.selectedTables.forEach(table => {
            const assignment = axios.post(API_URL + "tables-to-waiters/assign", 
                   {
                    cafeTableId: this.state.table.id,
                    waiterUsername: this.state.waiter.username
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
                if(err.response && err.response.status == 401) {
                    this.setState({tokenIsExpired: true})
                }
                this.setState({errorMessages: err.response.data.errors});
            });
        });
        
    }

    handleCloseError() {
        this.setState({errorMessages: []});
    }

    handleCloseTableChoice() {
        this.setState({showFreeTables: false});
    }
    onTableIdClick(event) {
        event.preventDefault();
        this.setState({showFreeTables: true});
    }

    onWaiterUsernameClick(event) {
        event.preventDefault();
        this.setState({showWaiters: true})
    }

    saveSelectedTables(tables) {
        this.setState({selectedTables: tables});
    }

    render() {
        console.log(this.state.selectedTables);
        if(this.state.assigned) {
            return <Redirect to="/home"/>
        }
        return (
            <div className={this.state.showFreeTables && this.state.showWaiters ? "assignment-box blur" : "assignment-box"}>
                <h3 className="text">Assign Cafe Table to Waiter</h3>
                <hr></hr>
                <form className={this.state.errorMessages.length == 0 && !this.state.showFreeTables && !this.state.showWaiters ? "form-group" : "form-group blur"}>
                    <div className='box-row'>
                        <button className='selection-button'
                                onClick={this.onTableIdClick}>
                                {<FontAwesomeIcon icon={faCalendarCheck} size="lg"/>}
                        </button>
                        <input type="text" 
                            placeholder="Table Id"
                            value={this.state.selectedTables.map(table => table.id)}
                            className="form-control custom-input"
                            readOnly
                        />
                    </div>

                    <hr></hr>
                    <div className='box-row'>
                        <button className='selection-button'
                                onClick={this.onWaiterUsernameClick}>
                                {<FontAwesomeIcon icon={faCalendarCheck} size="lg"/>}
                        </button>
                        <input type="text" 
                            placeholder="Waiter Username"
                            value={this.state.waiter.username}
                            className="form-control custom-input"
                            readOnly
                        />
                    </div>

                    <hr></hr>
                    <button onClick={this.handleSubmit} className="custom-button-submit">Assign</button>
                </form>
                {this.state.tokenIsExpired && 
                <RefreshTokenBox onRefresh={() => this.setState({tokenIsExpired: false}) }/>}
                {this.state.showFreeTables && 
                <ViewFreeTablesBox onCloseTableChoice={this.handleCloseTableChoice} 
                                   onSaveSelectedTables={this.saveSelectedTables} 
                                   selectedTables={this.state.selectedTables} />}
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleCloseError}/>}
            </div>
        );
    }
}

export default AssignForm;


            // <div className='user-add-form'>
            //     <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
            //         <Input type="number"
            //             name="tableId"
            //             placeholder="Table Id"
            //             value={this.state.tableId}
            //             onChange={this.handleTableIdChange} 
            //             label="Table Id" />
            //         <Input type="text"
            //             name="waiter-username"
            //             placeholder="Waiter Username"
            //             value={this.state.waiterUsername}
            //             onChange={this.handleWaiterUsernameChange} 
            //             label="Waiter Username" />
            //         <Submit onSubmit={this.handleSubmit} value="Assign"/>
            //     </form>
            //     {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            // </div>
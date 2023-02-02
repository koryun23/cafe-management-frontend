import axios from 'axios';
import React from 'react';
import "../css/AssignForm.css";
import ErrorMessage from './ErrorMessage.js';
import Input from './Input.js';
import Submit from './Submit.js';
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
            tables: [],
            waiters: [],
            table: {}, 
            waiter: {},
            assigned: false,
            errorMessages: [],
            showFreeTables: false,
            showWaiters: false
        }
        this.onTableIdClick = this.onTableIdClick.bind(this);
        this.onWaiterUsernameClick = this.onWaiterUsernameClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    static invalidCreds(creds) {
        return (
            !creds.tableId ||
            !creds.waiterUsername
        );
    }

    componentDidMount() {
        this.fetchCafeTables();
        this.fetchWaiters();
    }

    fetchCafeTables() {
        const auth = "Bearer " + localStorage.getItem("token");
        const tables = axios.get(API_URL + "tables", {
                                headers: {
                                    "Authorization" : auth,
                                    "Content-Type" : "application/json"
                                }, data: {}
                            });
        tables.then(res => {
            this.setState({
                tables: res.data.cafeTableRetrievalResponseDtoList.filter(table => table.status === 'FREE').map(table => (
                    {id: table.id, code: table.code, numberOfSeats: table.seats, status: table.status}
                ))
            })
        }).catch(err => {
            console.log(err.data);
        });
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
            this.setState({errorMessages: err.response.data.errors});
        });
    }

    handleClose() {
        this.setState({errorMessages: []});
    }

    onTableIdClick() {

    }

    onWaiterUsernameClick() {

    }
    render() {
        console.log(this.state.waiters);
        console.log(this.state.tables);
        if(this.state.assigned) {
            return <Redirect to="/home"/>
        }
        return (
            <div className="assignment-box">
                <h3 className="text">Assign Cafe Table to Waiter</h3>
                <hr></hr>
                <form className={this.state.errorMessages.length == 0 && !this.state.showFreeTables && !this.state.showWaiters ? "form-group" : "form-group blur"}>
                    <div className='box-row'>
                        <button className='selection-button'
                                onClick={this.onTableIdClick}>
                                {<FontAwesomeIcon icon={faCalendarCheck} size="lg"/>}
                        </button>
                        <input type="number" 
                            placeholder="Table Id"
                            value={this.state.table.id}
                            className="form-control custom-input"
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
                        />
                    </div>

                    <hr></hr>
                    <button onClick={this.handleSubmit} className="custom-button-submit">Assign</button>
                </form>
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
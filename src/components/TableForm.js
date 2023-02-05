import axios from 'axios';
import React from 'react';
import "../css/TableForm.css";
import Input from './Input.js';
import Submit from './Submit';
import ErrorMessage from './ErrorMessage.js';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RefreshTokenBox from './RefreshTokenBox.js';
import { faCode, faCouch, faIdBadge, faIdCard, faIdCardAlt, faPen, faPenAlt, faSoccerBall, faTable, faTableCellsLarge, faTableColumns, faTableTennis, faTableTennisPaddleBall } from '@fortawesome/free-solid-svg-icons';
import { FaIdCardAlt } from 'react-icons/fa';
const API_URL = "http://localhost:7000/";

class TableForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeatsChange = this.handleSeatsChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {
            seats: '', 
            code: '',
            registered: false,
            errorMessages: [],
            tokenIsExpired: false
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

    refresh() {
        this.setState({tokenIsExpired: false});
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
        }).catch(err => {
            console.log(err);
            console.log(this.state);
            if(err.response) {
                if(err.response.status == 401) {
                    this.setState({tokenIsExpired: true});
                } else if(err.response.status != 200){
                    this.setState({errorMessages: err.response.data.errors});
                }
            }
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
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={this.refresh}/>
        }
        return (
            <div className='table-add-form'>
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
                    <div className="number-div">
                        <div className='icon-table-form'>
                            <FontAwesomeIcon icon={faCouch} size="lg"/>
                        </div>
                        <Input type="number"
                            name="seats"
                            placeholder="Number of seats"
                            value={this.state.seats}
                            onChange={this.handleSeatsChange} 
                            />
                    </div>
                    <div className="code-div">
                        <div className="icon-table-form">
                            <FontAwesomeIcon icon={faIdCardAlt} size="lg"/>
                        </div>
                        <Input type="text"
                            name="code"
                            placeholder="Table code"
                            value={this.state.code}
                            onChange={this.handleCodeChange} 
                            />
                    </div>
                    
                    {/* <Submit onSubmit={this.handleSubmit} value="Add Table"/> */}
                    <button className="custom-button-register"
                            onClick={this.handleSubmit}>
                        Register
                    </button>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            </div>
        );
    }
}
export default TableForm;
import React from 'react';
import Input from './Input.js';
import Submit from './Submit.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API_URL = "http://localhost:7000/";

class OrderUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
        }
    }


    handleSelectionChange(event) {
        this.setState({status : event.target.name});
    }

    handleConfirmUpdateClick(event) {
        event.preventDefault();
        const auth = "Bearer " + localStorage.getItem("token");
        console.log(API_URL + "orders/update/" + this.props.orderId);
        console.log(this.props.tableId);
        console.log(this.state.status);
        axios.put(API_URL + "orders/update/" + this.props.orderId, {
                cafeTableId: this.props.tableId,
                orderStatusType: this.state.status
            }, {headers: {"Authorization" : auth, "Content-Type" : "application/json"}
        }).then(res => {
            console.log(res);
            this.props.onClose();
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className='update-box'>
                <button class="close-button" onClick={this.props.onClose}>
                    {<FontAwesomeIcon icon={faClose} size="lg"/>}
                </button>
                <div className="form-group">
                    <label>Open</label>
                    <input type="radio"  
                           name="OPEN" 
                           value="Open" 
                           checked={this.state.status==="OPEN"} 
                           onChange={(event) => this.handleSelectionChange(event)}/>
                </div>
                <hr />
                <div className="form-group">
                    <label>Closed</label>
                    <input type="radio" 
                           className="form-group" 
                           name="CLOSED" 
                           value="Closed" 
                           checked={this.state.status==="CLOSED"} 
                           onChange={(event) => this.handleSelectionChange(event)} />
                </div>
                <hr />
                <div>
                    <label>Cancelled</label>
                    <input type="radio" 
                           className="form-group" 
                           name="CANCELLED" 
                           value="Cancelled" 
                           checked={this.state.status==="CANCELLED"} 
                           onChange={(event) => this.handleSelectionChange(event)}/>
                </div>
                <button className="update-confirm" onClick={(event) => this.handleConfirmUpdateClick(event)}>Update</button>
            </div>
        );
    }
}

export default OrderUpdateForm;
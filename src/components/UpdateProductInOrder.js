import React from 'react';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const API_URL = "http://localhost:7000/";

class UpdateProductInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "ACTIVE", 
            updated: false,
            errorMessages: []
        }
    }

    handleSelectionChange(event) {
        this.setState({status: event.target.name});
    }

    handleConfirmUpdateClick(event) {
        event.preventDefault();
        const auth = "Bearer " + localStorage.getItem("token");
        const data = {
            productName: this.props.initialProduct.productName,
            orderId: parseInt(this.props.initialProduct.orderId),
            amount: parseInt(this.props.initialProduct.amount),
            status: this.state.status
        };
        const url = API_URL + "products-in-order/update/" + this.props.initialProduct.id;
        console.log(data);
        console.log(url)
        axios.put(url, data, {headers: {
            "Authorization" : auth,
            "Content-Type" : "application/json"
        }}).then(res => {
            console.log(res.data);
            this.setState({updated: true});
            this.props.onClose();
        }).catch(err => {
            console.log(err);
            this.setState({errorMessages: err.response.data.errors});
        });
    }

    render() {
        return (    
            <div className='update-box'>
                <button className="close-button" onClick={this.props.onClose}>
                    {<FontAwesomeIcon icon={faClose} size="lg"/>}
                </button>
                <div className="form-group">
                    <label className="status-label">Active</label>
                    <input type="radio"  
                           name="ACTIVE" 
                           value="Active" 
                           checked={this.state.status==="ACTIVE"} 
                           onChange={(event) => this.handleSelectionChange(event)}/>
                </div>
                <hr />
                <div className="form-group">
                    <label className="status-label">Closed</label>
                    <input type="radio" 
                           className="form-group" 
                           name="CLOSED" 
                           value="Closed" 
                           checked={this.state.status==="CLOSED"} 
                           onChange={(event) => this.handleSelectionChange(event)} />
                </div>
                <hr />
                <div>
                    <label className="status-label">Cancelled</label>
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

export default withRouter(UpdateProductInOrder);
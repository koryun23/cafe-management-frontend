import React from "react";
import "../css/DeleteConfirm.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "react-bootstrap";

const API_URL = "http://localhost:7000/";

class DeleteConfirm extends React.Component {
    
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(event) {
        event.preventDefault();
        this.props.onDelete();
        const auth = "Bearer " + localStorage.getItem("token");
        
        axios.delete(API_URL + "products/delete/" + this.props.product.productId, {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data : {}
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            this.setState({errors: err.response.data.errors});
            console.log(err);
        });
    }
    
    render() {
        console.log(this.props.product);
        return (
            <div className="delete-confirm-box">
                <button className="close-button" onClick={this.props.onCancelDeletion}>
                    {<FontAwesomeIcon icon={faClose} size="lg"/>}
                </button>
                <hr></hr>
                <h4 class="confirmation-text">Are you sure you want to delete this item?</h4>
                <hr></hr>
                <h4 className="product-name">Name: <b>{this.props.product.productName}</b></h4>
                <h4 className="product-amount">Amount: <b>{this.props.product.productAmount}</b></h4>
                <h4 className="product-price">Price: <b>{this.props.product.productPrice}</b></h4>
                <hr></hr>
                <button className="custom-button" onClick={(event) => this.onDelete(event)}>Yes, Delete</button>
            </div>
        );
    }
}

export default DeleteConfirm;
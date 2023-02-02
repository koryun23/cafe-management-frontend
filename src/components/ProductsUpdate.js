import React, { useState } from 'react';
import "../css/ProductsUpdate.css";
import { useParams } from 'react-router-dom';
import Input from './Input';
import Submit from './Submit';
import ManagerMenu from './ManagerMenu';
import BackgroundImage from './BackgroundImage';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const API_URL = "http://localhost:7000/";

function invalidCreds(creds) {
    return (
        !creds.name ||
        !creds.price ||
        !creds.amount
    );
}
function ProductsUpdate(props) {

    const {id} = useParams();
    let [state = {
        name: "",
        price: "",
        amount: "",
        errorMessages: [],
        updated: false
    }, setState] = useState();

    const handleProductNameChange = (name) => {
        setState({
            ...state,
            name: name,
        })
    }

    const handleProductPriceChange = (price) => {
        setState({
            ...state,
            price: price
        })
    }

    const handleProductAmountChange = (amount) => {
        setState({
            ...state,
            amount: amount
        })
    }

    const handleClose = () => {
        setState({
            ...state,
            errorMessages: []
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
        if(invalidCreds(state)) {
            setState({
                ...state,
                errorMessages: ["All fields are required"]
            });
            return;
        }
        const auth = "Bearer " + localStorage.getItem("token");
        axios.put(API_URL + "products/update/" + props.product.productId, {
            id: id,
            name: state.name,
            price: state.price,
            amount: state.amount
        }, {headers: {
            "Authorization" : auth,
            "Content-Type" : "application/json"
        }}).then(res => {
            setState({
                ...state, 
                updated: true
            });
        }).catch(err => {
            console.log(err);
            console.log(state);
            setState({
                ...state, 
                errorMessages: err.response.data.errors
            });
        });
    }
    console.log(state);
    return (
        <div>
            <div className="user-add-form">
                <button className="close-button" onClick={props.onUpdateFormClose}>
                    {<FontAwesomeIcon icon={faClose} size="lg"/>}
                </button>
                <hr></hr>
                {/* <h5>Name: <b>{props.product.productName}</b></h5>
                <h5>Amount: <b>{props.product.productAmount}</b></h5>
                <h5>Price: <b>{props.product.productPrice}</b></h5> */}
                <table className="selected-product-table">
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>{props.product.productName}</td>
                        <td>{props.product.productAmount}</td>
                        <td>{props.product.productPrice}</td>
                    </tr>
                </table>
                <hr></hr>
                <form className={state.errorMessages.length == 0 ? "" : "blur"}>
                    <Input type="text"
                            name="product-name"
                            placeholder="New Name"
                            value={state.name}
                            onChange={handleProductNameChange} 
                            />
                    <Input type="number"
                            name="product-price"
                            placeholder="New Price"
                            value={state.price}
                            onChange={handleProductPriceChange} 
                            />
                    <Input type="number"
                            name="product-amount"
                            placeholder="New Amount"
                            value={state.amount}
                            onChange={handleProductAmountChange} 
                            />
                    {/* <Submit onSubmit={handleSubmit} value="Update Product"/> */}
                    <button className="custom-button-update" onClick={(event) => handleSubmit(event)}>Update</button>
                </form>
                {state.errorMessages.length > 0 && <ErrorMessage message={state.errorMessages[0]} onClose={handleClose}/>}
                {state.updated && props.onUpdate()}
            </div>
        </div>
    );
    
}

export default ProductsUpdate;
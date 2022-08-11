import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from './Input';
import Submit from './Submit';
import ManagerMenu from './ManagerMenu';
import BackgroundImage from './BackgroundImage';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';
const API_URL = "http://localhost:7000/";
function ProductsUpdate(props) {

    const {id} = useParams();
    const productName = localStorage.getItem("productName");
    const productAmount = localStorage.getItem("productAmount");
    const productPrice = localStorage.getItem("productPrice");
    let [state = {
        name: productName || "",
        price: productPrice || "",
        amount: productAmount || "",
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
    const handleSubmit = () => {
        console.log(state);
        const auth = "Bearer " + localStorage.getItem("token");
        axios.put(API_URL + "products/update/" + id, {
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
            localStorage.removeItem("productName");
            localStorage.removeItem("productAmount");
            localStorage.removeItem("productPrice");
        }).catch(err => {
            console.log(err);
            setState({
                ...state, 
                errorMessages: err.response.data.errors
            });
        });
    }
    console.log(state);
    if(state.updated) {
        return <Redirect to="/home"/>
    }
    return (
        <div>
            <BackgroundImage/>
            <div className="user-add-form">
                <form className={state.errorMessages.length == 0 ? "" : "blur"}>
                    <h3 className="header">Product id: {id}</h3>

                    <Input type="text"
                            name="product-name"
                            placeholder="New Name"
                            value={state.name}
                            onChange={handleProductNameChange} 
                            label={`New Name (${productName})`} />
                    <Input type="number"
                            name="product-price"
                            placeholder="New Price"
                            value={state.price}
                            onChange={handleProductPriceChange} 
                            label={`New Price (${productPrice})`} />
                    <Input type="number"
                            name="product-amount"
                            placeholder="New Amount"
                            value={state.amount}
                            onChange={handleProductAmountChange} 
                            label={`New Amount (${productAmount})`} />
                    <Submit onSubmit={handleSubmit} value="Update Product"/>
                </form>
                {state.errorMessages.length > 0 && <ErrorMessage message={state.errorMessages[0]} onClose={handleClose}/>}

            </div>
        </div>
    );
    
}

export default ProductsUpdate;
import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.js';
import Input from './Input.js';
import Submit from './Submit.js';

const API_URL = "http://localhost:7000/";

class ProductsRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productAmount: '',
            registered: false,
            errorMessages: []
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleProductNameChange(name) {
        this.setState({productName: name});
    }

    handleProductAmountChange(amount) {
        this.setState({productAmount: amount});
    }

    handleProductPriceChange(price) {
        this.setState({productPrice: price});
    }

    handleSubmit(event) {
        event.preventDefault();
        const auth = "Bearer " + localStorage.getItem("token");
        const productRegistration = axios.post(API_URL + "products/register", {
                name: this.state.productName,
                price: this.state.productPrice,
                amount: this.state.productAmount
            },
            {headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            }}
        );

        productRegistration.then(res => {
            console.log(res.data);
            this.setState({registered: true})
        }).catch(res => {
            console.log(res)
            if(res.status != 200) {
                this.setState({errorMessages: res.response.data.errors})
            }
        });
    }

    handleClose(event) {
        this.setState({
            productName: '',
            productPrice: '',
            productAmount: '',
            registered: false,
            errorMessages: []
        });
    } 

    render() {
        if(this.state.registered) {
            return <Redirect to="/home"/>
        }
        console.log(this.state.errorMessages);
        return (
            <div className='user-add-form'>
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
                    <Input type="text"
                        name="product-name"
                        placeholder="Product Name"
                        value={this.state.productName}
                        onChange={this.handleProductNameChange} 
                        label="Product Name" />
                    <Input type="number"
                        name="product-price"
                        placeholder="Product Price"
                        value={this.state.productPrice}
                        onChange={this.handleProductPriceChange} 
                        label="Product Price" />
                    <Input type="number"
                        name="product-amount"
                        placeholder="Product Amount"
                        value={this.state.productAmount}
                        onChange={this.handleProductAmountChange} 
                        label="Product Amount" />
                    <Submit onSubmit={this.handleSubmit} value="Add Product"/>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            </div>
        );
    }
}

export default ProductsRegistrationForm;



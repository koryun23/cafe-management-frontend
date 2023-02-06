import axios from 'axios';
import React from 'react';
import "../css/ProductsForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.js';
import Input from './Input.js';
import Submit from './Submit.js';
import { faBreadSlice, faBurger, faCashRegister, faCocktail, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import RefreshTokenBox from './RefreshTokenBox';

const API_URL = "http://localhost:7000/";

class ProductsRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productPrice: '',
            productAmount: '',
            registered: false,
            errorMessages: [],
            tokenIsExpired: false
        }
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductAmountChange = this.handleProductAmountChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    static invalidCreds(creds) {
        return (
            !creds.productName ||
            !creds.productPrice ||
            !creds.productAmount 
        );
    }

    refresh() {
        this.setState({tokenIsExpired: false});
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
        if(ProductsRegistrationForm.invalidCreds(this.state)) {
            this.setState({errorMessages: ["All fields are required"]});
            return;
        }
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
        }).catch(err => {
            console.log(err)
            if(err.response) {
                if(err.response.status == 401) {
                    this.setState({tokenIsExpired: true});
                } else if(err.response.status != 200) {
                    this.setState({errorMessages: err.response.data.errors});
                }
            }
        });
    }

    handleClose(event) {
        this.setState({
            errorMessages: []
        });
    } 

    render() {
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={() => this.setState({tokenIsExpired: false})}/>
        }
        if(this.state.registered) {
            return <Redirect to="/home"/>
        }
        console.log(this.state.errorMessages);
        return (
            <div className='user-add-form'>
                <h2 className='text'>Register a Product</h2>
                <hr></hr>
                <form className={this.state.errorMessages.length == 0 ? "form-group" : "form-group blur"}>
                    <div className="product-name-div">
                        <div className="product-icon">
                            <FontAwesomeIcon icon={faBurger} size="lg"/>
                        </div>
                        <Input type="text"
                            name="product-name"
                            placeholder="Name"
                            value={this.state.productName}
                            onChange={this.handleProductNameChange} 
                            />
                    </div>
                    <div className="product-price-div">
                        <div className="product-icon">
                            <FontAwesomeIcon icon={faMoneyBill} size="lg"/>
                        </div>
                        <Input type="number"
                            name="product-price"
                            placeholder="Price"
                            value={this.state.productPrice}
                            onChange={this.handleProductPriceChange} 
                            />
                    </div>
                    <div className="product-amount-div">
                        <div className="product-icon">
                            <FontAwesomeIcon icon={faCashRegister}/>
                        </div>
                        <Input type="number"
                            name="product-amount"
                            placeholder="Amount"
                            value={this.state.productAmount}
                            onChange={this.handleProductAmountChange} 
                            />
                    </div>

                    <button className="custom-button-registration" onClick={this.handleSubmit}>
                        Add Product
                    </button>
                </form>
                {this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={this.handleClose}/>}
            </div>
        );
    }
}

export default ProductsRegistrationForm;



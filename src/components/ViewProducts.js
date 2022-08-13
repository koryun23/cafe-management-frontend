import React from 'react';
import '../css/ViewProduct.css';
import Submit from './Submit.js';
import {FaBeer} from 'react-icons/fa';
import axios from 'axios';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/to-have-accessible-description';

const API_URL = "http://localhost:7000/";
class ViewProducts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            errorMessages: []
        }
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        const getProducts = axios.get(API_URL + "products", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        });
        getProducts.then(res => {
            console.log(res.data);
            const fetchedProducts = res.data.productRetrievalResponseDtoList.map(product => (
                {productName: product.name, productAmount: product.amount, productPrice: product.price, productId: product.id}
            ))
            this.setState({products: fetchedProducts});
        }).catch(error => {
            console.log(error);
        });
    }
    handleUpdateClick(name, amount, price) {
        localStorage.setItem("productName", name);
        localStorage.setItem("productAmount", amount);
        localStorage.setItem("productPrice", price);
    }

    handleDeleteClick(id) {
        console.log(id);
        const auth = "Bearer " + localStorage.getItem("token");
        
        axios.delete(API_URL + "products/delete/" + id, {
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
        console.log(this.state.errorMessages);
        if(this.state.products.length == 0) {
            return (
                <div className='main-div'>
                    <h2 className="h2">Oops!</h2>
                    <p className='p'>No Data found.</p>
                </div>
            );
        }
        return (
            <div className="main-div">
                <table className={this.state.errorMessages.length == 0 ? '' : 'blur'}>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th className="last-row"></th>
                        </tr>
                    {
                        this.state.products.map((product) => (
                            <tr>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productAmount}</td>
                                <td>{product.productPrice}</td>
                                <td className="last-row">
                                    <a className="update-button" href={"/products/update/" + product.productId} onClick={() => this.handleUpdateClick(product.productName, product.productAmount, product.productPrice)}>
                                        {<FontAwesomeIcon icon={faEdit}/>}
                                    </a>
                                    <a className="delete-button" href="/products/" onClick={() => this.handleDeleteClick(product.productId)}>
                                        {<FontAwesomeIcon icon={faTrash}/>}
                                    </a>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {this.state.errorMessages.length > 0 &&
                <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})} />}
            </div>
        );
    }
}

export default ViewProducts;
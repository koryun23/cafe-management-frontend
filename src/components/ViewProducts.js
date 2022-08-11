import React from 'react';
import '../css/ViewProduct.css';
import Submit from './Submit.js';
import {FaBeer} from 'react-icons/fa';
import axios from 'axios';
import BackgroundImage from './BackgroundImage';

const API_URL = "http://localhost:7000/";
class ViewProducts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: []
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
    handleUpdateClick(event) {

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
            console.log(err);
        });

    }

    render() {
        return (
            <div className="products">
                <BackgroundImage/>
                {
                    this.state.products.map((product) => (
                        <div className="product-box" key={product.productId.toString()}>
                            <div className="product-image"> </div>
                            <h2 className="name">{product.productName}</h2>
                            <i><b><p className="amount">AMOUNT: {product.productAmount}</p></b></i>
                            <i><b><p className="price">PRICE: {product.productPrice}</p></b></i>
                            <a className="update-button" href={"/products/update/" + product.productName.toLowerCase().replace(/\s/g, '_')}>
                                Update
                            </a>
                            <a className="delete-button" href="/products/" onClick={() => this.handleDeleteClick(product.productId)}>
                                Delete<i className="fa fa-trash"></i>
                            </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewProducts;
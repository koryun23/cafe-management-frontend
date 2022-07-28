import React from 'react';
import '../css/ViewProduct.css';
import Submit from './Submit.js';
import {FaBeer} from 'react-icons/fa';

class ViewProducts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {productName: "Product 1", productAmount: 50, productPrice: 150},
                {productName: "Product 2", productAmount: 25, productPrice: 200},
                {productName: "Product 3", productAmount: 20, productPrice: 850},
            ]
        }
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleUpdateClick(event) {

    }

    handleDeleteClick(event) {

    }

    render() {
        return (
            <div className="products">
                {
                    this.state.products.map((product) => (
                        <div className="product-box">
                            <div className="product-image"> </div>
                            <h2 className="name">{product.productName}</h2>
                            <i><b><p className="amount">AMOUNT: {product.productAmount}</p></b></i>
                            <i><b><p className="price">PRICE: {product.productPrice}</p></b></i>
                            <a className="update-button" href={"/products/update/" + product.productName.toLowerCase().replace(/\s/g, '_')}>
                                Update
                            </a>
                            <a className="delete-button" href="/products/">
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
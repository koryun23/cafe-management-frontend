import axios from 'axios';
import React from 'react';
import '../css/ViewProductsInOrder.css';

const API_URL = "http://localhost:7000/";

class ViewProductsInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInOrder: [
                {productName: 'Product1', orderId: 1, amount: 5, status: "ACTIVE"},
                {productName: 'Product2', orderId: 1, amount: 3, status: "ACTIVE"},
                {productName: 'Product3', orderId: 2, amount: 5, status: "ACTIVE"}
            ],
            orderId: ""
        };
    }

    componentDidMount() {
        this.setState({orderId: localStorage.getItem("orderId")});
        const auth = "Bearer " + localStorage.getItem("token");
        axios.get(API_URL + "products-in-order/" + localStorage.getItem("orderId"), {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        }).then(res => {
            console.log(res.data);
            this.setState({productsInOrder : res.data.productInOrderRetrievalResponseDtos.map(productInOrder => (
                {
                    productName: productInOrder.productName,
                    orderId: this.state.orderId,
                    amount: productInOrder.amount,
                    status: productInOrder.productInOrderStatusType
                }
            ))});
        }).catch(err => {
            console.log(err);
        }); 
    }

    render() {
        return (
            <div>
                {
                    this.state.productsInOrder.map(product => (
                        <div className="product-in-order-box">
                            <div className="product-image"></div>
                            <h2 className="product-name">{product.productName}</h2>
                            <b><i><p className="order-id">Order Id: {product.orderId}</p></i></b>
                            <b><i><p className="status">Status: {product.status}</p></i></b>
                            <b><i><p className="amount">Amount: {product.amount}</p></i></b>
                            <a className="update-product-in-order"
                               href={"/products-in-order/update/" + product.orderId}>
                                Update
                            </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ViewProductsInOrder;
import axios from 'axios';
import React from 'react';
import '../css/ViewProductsInOrder.css';
import { withRouter } from 'react-router-dom';
const API_URL = "http://localhost:7000/";

class ViewProductsInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInOrder: [],
        };
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        console.log(API_URL + "products-in-order/" + this.state.orderId);
        axios.get(API_URL + "products-in-order/" + this.props.match.params.orderId, {
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
                    orderId: this.props.match.params.orderId,
                    amount: productInOrder.amount,
                    status: productInOrder.productInOrderStatusType
                }
            ))});
        }).catch(err => {
            console.log(err);
        }); 
    }

    componentWillUnmount() {
        localStorage.removeItem("orderId");
    }

    render() {
        console.log(this.props.match.params.orderId);
        return (
            <div>
                {
                    this.state.productsInOrder.map(product => (
                        <div className="product-in-order-box">
                            <div className="product-image"></div>
                            <h2 className="product-name">{product.productName}</h2>
                            <b><i><p className="order-id">Order Id: {this.props.match.params.orderId}</p></i></b>
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

export default withRouter(ViewProductsInOrder);
import axios from 'axios';
import React from 'react';
import '../css/ViewProductsInOrder.css';
import { Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from './ErrorMessage';
import UpdateProductInOrder from './UpdateProductInOrder';
const API_URL = "http://localhost:7000/";

class ViewProductsInOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInOrder: [],
            showUpdateProductInOrderPage: false,
            selectedProduct: {}, 
            errorMessages: [],
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
                    id: productInOrder.productInOrderId,
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

    handleUpdateProductInOrderClick(product) {
        if(product.status !== "ACTIVE") {
            this.setState({errorMessages: ["Cannot update the product in order because it is not ACTIVE"]});
            return;
        }
        this.setState({showUpdateProductInOrderPage: true, selectedProduct: product});
    }

    render() {
        console.log(this.props.match.params.orderId);
        // if(this.state.showUpdateProductInOrderPage) {
        //     return <Redirect to={"products-in-order/update/" + this.state.selectedProduct.id}/>
        // }
        return (
            <div className="main-div">
                <table className={this.state.errorMessages.length == 0 || this.state.showUpdateProductInOrderPage ? "" : "blur"}>
                    <tr>
                        <th>Product In Order Id</th>
                        <th>Product Name</th>
                        <th>Order Id</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                {
                    this.state.productsInOrder.map(product => (
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{this.props.match.params.orderId}</td>
                            <td>{product.status}</td>
                            <td>{product.amount}</td>
                            <td>
                                <a className="update-product-in-order"
                                    onClick={() => this.handleUpdateProductInOrderClick(product)}>
                                    {<FontAwesomeIcon icon={faEdit} size="lg"/>}
                                </a>
                            </td>
                        </tr>
                    ))
                }
                </table>
                {
                    this.state.errorMessages.length > 0 &&
                    <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})}/>
                }
                {
                    this.state.showUpdateProductInOrderPage &&
                    <UpdateProductInOrder onClose={() => this.setState({showUpdateProductInOrderPage: false})} initialProduct={this.state.selectedProduct} />
                }
            </div>
        );
    }
}

export default withRouter(ViewProductsInOrder);
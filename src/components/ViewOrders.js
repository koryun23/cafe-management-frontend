import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import axios from 'axios';
import React from 'react';
import '../css/ViewOrders.css';
import BackgroundImage from './BackgroundImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import OrderUpdateForm from './OrderUpdateForm';
import { withRouter, Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
const API_URL = "http://localhost:7000/";

class ViewOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            selectedOrder: {},
            errorMessages: [],
            redirectToAddProductPage: false,
            redirectToViewProductsPage: false
        }

        this.handleAddProductInOrderClick = this.handleAddProductInOrderClick.bind(this);
        this.handleViewProductsInOrderClick = this.handleViewProductsInOrderClick.bind(this);
    }

    componentDidMount() {
        const auth = "Bearer " + localStorage.getItem("token");
        axios.get(API_URL + "orders", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        }).then(res => {
            this.setState({orders: res.data.orderRetrievalResponseDtoList.map(order => (
                {
                    orderId: order.orderId,
                    tableId: order.tableId,
                    waiterUsername: order.waiterUsername,
                    status: order.orderStatus,
                    date: new Date(order.createdAt)
                }
            ))});
        }).catch(err => {
            console.log(err);
        });
    }

    handleAddProductInOrderClick(order) {
        if(order.status !== "OPEN") {
            this.setState({errorMessages: ["Cannot add product because the order is not OPEN"]});
            return;
        }
        this.setState({redirectToAddProductPage: true, selectedOrder: order});
    }

    handleViewProductsInOrderClick(order) {
        this.setState({redirectToViewProductsPage : true, selectedOrder: order});
    }

    handleUpdateOrderClick(order) {
        if(order.status !== "OPEN") {
            this.setState({errorMessages: ["Cannot update product because the order is not OPEN"]});
            return;
        }
        this.setState({showUpdateBox: true, selectedOrder: order});
    }

    render() {
        console.log(this.state);
        if(this.state.redirectToAddProductPage) {
            return <Redirect to={"/products-in-order/register/" + this.state.selectedOrder.orderId}/>
        }
        if(this.state.redirectToViewProductsPage) {
            return <Redirect to={"products-in-order/" + this.state.selectedOrder.orderId}/>
        }
        return (
            <div className='main-div'>
                <table className={this.state.showUpdateBox ? "blur" : ""}>
                    <tr>
                        <th>Order Id</th>
                        <th>Table Id</th>
                        <th>Status</th>
                        <th>Waiter</th>
                        <th>Created At</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                {
                    this.state.orders.map(order => (
                            <tr>
                                <td>{order.orderId}</td>
                                <td>{order.tableId}</td>
                                <td>{order.status}</td>
                                <td>{order.waiterUsername}</td>
                                <td>{order.date.toLocaleString()}</td>
                                <td>
                                    <a className="update-order"
                                        onClick={() => this.handleUpdateOrderClick(order)}>
                                        {<FontAwesomeIcon icon={faEdit} size="lg"/>}
                                    </a>
                                </td>
                                <td>
                                    <a className="add-product-in-order"
                                    onClick={() => this.handleAddProductInOrderClick(order)}>
                                        {<FontAwesomeIcon icon={faAdd} size="lg"/>}
                                    </a>
                                </td>
                                <td>
                                    <a className="products-in-order-view" 
                                    onClick={() => this.handleViewProductsInOrderClick(order)}>
                                        {<FontAwesomeIcon icon={faSearch} size="lg"/>}
                                    </a>
                                </td>
                            </tr>
                    ))
                }
                </table>
                {
                    this.state.showUpdateBox && 
                    <OrderUpdateForm onClose={() => this.setState({showUpdateBox: false, selectedOrder: {}})} orderId={this.state.selectedOrder.orderId} tableId={this.state.selectedOrder.tableId} waiterUsername={this.state.waiterUsername} createdAt={this.state.createdAt}/>
                }
                {
                    this.state.errorMessages.length > 0 &&
                    <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})}/>
                }
            </div>
        );
    }
}

export default withRouter(ViewOrders);
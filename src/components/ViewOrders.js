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

const API_URL = "http://localhost:7000/";

class ViewOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            selectedOrder: {}
        }

        this.handleAddProductInOrderClick = this.handleAddProductInOrderClick.bind(this);
        this.handleViewProductsInOrderClick = this.handleViewProductsInOrderClick.bind(this);
        this.handleConfirmUpdateClick = this.handleConfirmUpdateClick.bind(this);
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

    handleAddProductInOrderClick(id) {
        localStorage.setItem("orderId", id);
    }

    handleViewProductsInOrderClick(id) {
        localStorage.setItem("orderId", id);
    }

    handleUpdateOrderClick(order) {
        this.setState({showUpdateBox: true, selectedOrder: order});
    }

    handleConfirmUpdateClick(event) {
        event.preventDefault();
        const auth = "Bearer" + localStorage.getItem("token");
        axios.put();
    }

    render() {
        console.log(this.state);
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
                                    href={"/products-in-order/register/" + order.orderId} 
                                    onClick={() => this.handleAddProductInOrderClick(order.orderId)}>
                                        {<FontAwesomeIcon icon={faAdd} size="lg"/>}
                                    </a>
                                </td>
                                <td>
                                    <a className="products-in-order-view" 
                                    href={"/products-in-order/" + order.orderId}
                                    onClick={() => this.handleViewProductsInOrderClick(order.orderId)}>
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
            </div>
        );
    }
}

export default ViewOrders;
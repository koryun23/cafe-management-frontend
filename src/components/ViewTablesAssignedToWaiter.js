import React from 'react';
import "../css/ViewTablesAssignedToWaiter.css";
import axios from 'axios';
import BackgroundImage from './BackgroundImage';
import ErrorMessage from './ErrorMessage';
import Message from './Message';
const API_URL = "http://localhost:7000/";

class ViewTablesAssignedToWaiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedTables: [],
            registeredOrder: false,
            errorMessages: []
        };
    }

    componentDidMount() {      
        const auth = 'Bearer ' + localStorage.getItem("token");
        axios.get(API_URL + "tables-to-waiters", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
            data: {}
        }).then(res => {
            console.log(res.data);
            this.setState(
                {
                    assignedTables : res.data.cafeTableAssignedToWaiterList.map(table => (
                        {tableId: table.cafeTableId, waiter: table.waiterUsername, assignedAt: table.assignedAt}
                    ))
                }
            );
        }).catch(err => {
            console.log(err);
        })
    }
    handleAddOrderClick(id) {
        console.log(id); // getting the id of the table which will have an order attached to it
        const auth = "Bearer " + localStorage.getItem("token");
        axios.post(API_URL + "orders/register/" + id, {}, {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            },
        }).then(res => {
            console.log(res);
            this.setState({registeredOrder: true});
        }).catch(err => {
            console.log(err);
            this.setState({errorMessages: err.response.data.errors});
        })
    }

    render() {
        return (
            <div>
                <BackgroundImage />
                {
                    this.state.assignedTables.map(assignedTable => (
                        <div className={this.state.errorMessages.length == 0 ? "table-box" : "table-box blur"} key={assignedTable.tableId.toString()}>
                            <div className="table-image"></div>
                            <b><i><p className="table-code">ID: {assignedTable.tableId}</p></i></b>
                            <b><i><p className="table-assigned-at">ASSIGNED: {assignedTable.assignedAt}</p></i></b>
                            <button onClick={() => this.handleAddOrderClick(assignedTable.tableId)} 
                                className="add-order-button" 
                                //href={"/orders/register/" + assignedTable.tableId}
                                key={assignedTable.tableId} >
                                Add Order
                            </button>
                        </div>
                    ))
                }
                {
                    this.state.registeredOrder && <Message message="Successfully registered an order" onClose={this.setState({registeredOrder: false})}/>
                }
                {
                    this.state.errorMessages.length > 0 && <ErrorMessage message={this.state.errorMessages[0]} onClose={() => this.setState({errorMessages: []})}/> 
                }
            </div>
        );
    }
}


export default ViewTablesAssignedToWaiter;
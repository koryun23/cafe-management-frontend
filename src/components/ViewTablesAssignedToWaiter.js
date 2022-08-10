import React from 'react';
import "../css/ViewTablesAssignedToWaiter.css";
import axios from 'axios';
import BackgroundImage from './BackgroundImage';
const API_URL = "http://localhost:7000/";

class ViewTablesAssignedToWaiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedTables: []
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
    }

    render() {
        return (
            <div>
                <BackgroundImage />
                {
                    this.state.assignedTables.map(assignedTable => (
                        <div className="table-box" key={assignedTable.tableId.toString()}>
                            <div className="table-image"></div>
                            <b><i><p className="table-code">ID: {assignedTable.tableId}</p></i></b>
                            <b><i><p className="table-assigned-at">ASSIGNED: {assignedTable.assignedAt}</p></i></b>
                            <a onClick={() => this.handleAddOrderClick(assignedTable.tableId)} 
                                className="add-order-button" 
                                href={"/orders/register/" + assignedTable.tableId}
                                key={assignedTable.tableId} >
                                
                                Add Order
                            </a>
                        </div>
                    ))
                }
            </div>
        );
    }
}


export default ViewTablesAssignedToWaiter;
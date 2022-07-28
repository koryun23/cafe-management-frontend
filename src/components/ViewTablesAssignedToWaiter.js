import React from 'react';
import "../css/ViewTablesAssignedToWaiter.css";

class ViewTablesAssignedToWaiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedTables: [
                {code: "abcd1234", seats: 5, tableId: 1},
                {code: "qwerty", seats: 3, tableId: 2},
                {code: "dcba", seats: 4, tableId: 3}
            ]
        };
    }

    handleAddOrderClick(id) {
        console.log(id); // getting the id of the table which will have an order attached to it
    }

    render() {
        return (
            <div>
                {
                    this.state.assignedTables.map(assignedTable => (
                        <div className="table-box" key={assignedTable.tableId.toString()}>
                            <div className="table-image"></div>
                            <b><i><p className="table-code">CODE: {assignedTable.code}</p></i></b>
                            <b><i><p className="table-seats">SEATS: {assignedTable.seats}</p></i></b>
                            <b><i><p className="table-id">ID: {assignedTable.tableId}</p></i></b>
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
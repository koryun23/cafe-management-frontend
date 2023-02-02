//TODO: FIX THE BUG OF DOUBLE SELECTION

import React from "react";
import axios from "axios";
import "../css/ViewFreeTablesBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const API_URL = "http://localhost:7000/";

class ViewFreeTablesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            freeTables: [],
            selectedTables: this.props.selectedTables
        };
        this.onSelectCafeTable = this.onSelectCafeTable.bind(this);
        this.onCloseTableChoice = this.onCloseTableChoice.bind(this);
        this.onFinishSelection = this.onFinishSelection.bind(this);
    }

    fetchFreeTables() {
        const auth = "Bearer " + localStorage.getItem("token");
        const tables = axios.get(API_URL + "tables", {
                                headers: {
                                    "Authorization" : auth,
                                    "Content-Type" : "application/json"
                                }, data: {}
                            });
        tables.then(res => {
            this.setState({
                freeTables: res.data.cafeTableRetrievalResponseDtoList.filter(table => table.status === 'FREE').map(table => (
                    {id: table.id, code: table.code, numberOfSeats: table.seats, status: table.status}
                )),
            });            
        }).catch(err => {
            console.log(err.data);
        });
    }

    componentDidMount() {
        this.fetchFreeTables();
    }

    onSelectCafeTable(event, table) {
        console.log(event);
        let updatedSelectedTables = this.state.selectedTables.filter(t => t);
        let index = this.state.selectedTables.indexOf(table)
        console.log(index);
        if(index != -1) {
            this.setState({selectedTables: updatedSelectedTables.filter(t => t.code != table.code)});
        } else {
            updatedSelectedTables.push(table);
            this.setState({selectedTables: updatedSelectedTables});
        }
    }

    onCloseTableChoice(event) {
        event.preventDefault();
        this.props.onCloseTableChoice();
    }

    onFinishSelection(event) {
        event.preventDefault();
        this.props.onSaveSelectedTables(this.state.selectedTables);
        this.props.onCloseTableChoice();
    } 

    render() {
        console.log(this.state.selectedTables);
        return (
            <div className="tables-box">
                <button className="close-button" onClick={(event) => this.onCloseTableChoice(event)}>
                    <FontAwesomeIcon icon={faClose} size="lg"/>
                </button>
                <hr></hr>
                <div className="all-tables">
                    <div className="non-selected-free-tables">
                        <h3 className="text">Select a Table</h3>
                        <hr></hr>
                        <table className="free-tables">
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Seats</th>
                                <th>Checkbox</th>
                            </tr>
                            {
                                this.state.freeTables.map(table => (
                                    <tr onClick={() => this.onSelectCafeTable(table)}>
                                        <td>{table.id}</td>
                                        <td>{table.code}</td>
                                        <td>{table.numberOfSeats}</td>
                                        <td>
                                            <input type="checkbox"
                                                onChange={(event) => this.onSelectCafeTable(event, table) }
                                                defaultChecked={this.state.selectedTables.filter(selectedTable => selectedTable.code).includes(table.code)}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    <div className="selected-free-tables">
                        <h3 className="text">Selected Tables</h3>
                        <hr></hr>
                        <table className="free-tables">
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Seats</th>
                            </tr>
                            {
                                this.state.selectedTables.map(selectedTable => (
                                    <tr>
                                        <td>{selectedTable.id}</td>
                                        <td>{selectedTable.code}</td>
                                        <td>{selectedTable.numberOfSeats}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
                
                <button className="custom-button-finish-selection"
                        onClick={this.onFinishSelection}>
                    <p className="custom-button-text">Finish</p>
                </button>
            </div>
        );
    }

}

export default ViewFreeTablesBox;
import React from "react";
import axios from "axios";
import "../css/ViewWaiters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import RefreshTokenBox from "./RefreshTokenBox";
const API_URL = "http://localhost:7000/";

class ViewWaiters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiters: [],
            selectedWaiter: this.props.selectedWaiter,
            tokenIsExpired: false
        };

        this.onSelectWaiter = this.onSelectWaiter.bind(this);
        this.onCloseWaiterChoice = this.onCloseWaiterChoice.bind(this);
        this.onFinishSelection = this.onFinishSelection.bind(this);
    }

    fetchWaiters() {
        const auth = "Bearer " + localStorage.getItem("token");
        const waiterFetchRequest = axios.get(API_URL + "users", {
            headers: {
                "Authorization" : auth,
                "Content-Type" : "application/json"
            }, data: {}
        });
        waiterFetchRequest.then(res => {
            this.setState({
                waiters: res.data.userList.filter(user => user.roleList.includes("WAITER")).map(user => (
                    {username: user.username, firstName: user.firstName, secondName: user.secondName, roles: user.roleList}
                ))
            });
        }).catch(err => {
            if(err.response) {
                if(err.response.status == 401) {
                    this.setState({tokenIsExpired: true});
                }
            }
        });
    }

    componentDidMount() {
        this.fetchWaiters();
    }

    onSelectWaiter(event, waiter) {
        this.setState({selectedWaiter: waiter});
    }

    onCloseWaiterChoice(event) {
        event.preventDefault();
        this.props.onCloseWaiterChoice();
    }

    onFinishSelection(event) {
        event.preventDefault();
        this.props.onSaveSelectedWaiter(this.state.selectedWaiter);
        this.props.onCloseWaiterChoice();
    }

    render() {
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={() => this.setState({tokenIsExpired: false})}/>
        }
        return (
            <div className="waiters-box">
                <button className="close-button" onClick={(event) => this.onCloseWaiterChoice(event)}>
                    <FontAwesomeIcon icon={faClose} size="lg"/>
                </button>
                <hr></hr>
                <div className="all-waiters">
                    <div className="non-selected-waiters">
                        <h3 className="text">Select a Waiter</h3>
                        <hr></hr>
                        <table className="waiters">
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Second Name</th>
                                <th>Checkbox</th>
                            </tr>
                            {
                                this.state.waiters.map(waiter => (
                                    <tr>
                                        <td>{waiter.username}</td>
                                        <td>{waiter.firstName}</td>
                                        <td>{waiter.secondName}</td>
                                        <td>
                                            <input type="checkbox"
                                                onChange={(event) => this.onSelectWaiter(event, waiter) }
                                                checked={this.state.selectedWaiter.username == waiter.username}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    <div className="selected-waiters">
                        <h3 className="text">Selected Waiter</h3>
                        <hr></hr>
                        <table className="waiters">
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Second Name</th>
                            </tr>
                            
                            <tr>
                                <td>{this.state.selectedWaiter.username}</td>
                                <td>{this.state.selectedWaiter.firstName}</td>
                                <td>{this.state.selectedWaiter.secondName}</td>
                            </tr>
                            
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

export default ViewWaiters;
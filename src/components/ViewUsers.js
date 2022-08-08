import React from 'react';
import '../css/ViewUsers.css';
import axios from 'axios';

const API_URL = "http://localhost:8080/";

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {username: "john11", firstName: "John", secondName: "Smith", role: "MANAGER"},
                {username: "mary21", firstName: "Mary", secondName: "Williams", role: "WAITER"},
                {username: "emily31", firstName: "Emily", secondName: "Smith", role: "WAITER"}
            ]
        }
    }

    componentDidMount() {
        console.log(localStorage.getItem("token"));
        const getUsers = axios.get(API_URL + "users", {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("token"),
                "Content-Type" : "application/json"
            },
            data: {}
        });
        getUsers.then(res => {
            const users = res.data.userList.map(user => (
                {username: user.username, firstName: user.firstName, secondName: user.secondName, role: user.roleList[0]}
            ))
            this.setState({users: users});
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.users.map(user => (
                        <div className="user-box">
                            <div className={user.role.toLowerCase()+"-image"}></div>
                            <h3 className="user-username">{user.username}</h3>
                            <p className="user-full-name">{user.firstName + " " + user.secondName}</p>
                        </div>
                    ))
                }
            </div>

        );
    }
}

export default ViewUsers;
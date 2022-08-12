import React from 'react';
import '../css/ViewUsers.css';
import axios from 'axios';
import BackgroundImage from './BackgroundImage';

const API_URL = "http://localhost:7000/";

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
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
            console.log(res.data.userList)
            const fetchedUsers = res.data.userList.map(user => (
                {username: user.username, firstName: user.firstName, secondName: user.secondName, roles: user.roleList}
            ))
            this.setState({users: fetchedUsers});
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="main-div">
                <BackgroundImage />
                <table>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Second Name</th>
                        <th>Role 1</th>
                        <th>Role 2</th>
                    </tr>
                {
                    this.state.users.map(user => (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.roles[0]}</td>
                            <td>{user.roles[1]}</td>
                        </tr>
                    ))
                }
                </table>
            </div>

        );
    }
}

export default ViewUsers;
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
                {username: user.username, firstName: user.firstName, secondName: user.secondName, role: user.roleList[0].toLowerCase()}
            ))
            this.setState({users: fetchedUsers});
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <BackgroundImage />
                {
                    this.state.users.map(user => (
                        <div className="user-box">
                            <div className={user.role+"-image"}></div>
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
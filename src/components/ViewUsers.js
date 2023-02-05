import React from 'react';
import '../css/ViewUsers.css';
import axios from 'axios';
import BackgroundImage from './BackgroundImage';
import RefreshTokenBox from './RefreshTokenBox';

const API_URL = "http://localhost:7000/";

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showRoles: false,
            selectedRoles: [],
            tokenIsExpired: false
        }
        this.handleViewRolesClick = this.handleViewRolesClick.bind(this);
        this.refreshAndFetch = this.refreshAndFetch.bind(this);
    }

    refreshAndFetch() {
        this.fetchUsers();
        this.setState({tokenIsExpired: false});
    }
    fetchUsers() {
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
            if(error.response && error.response.status == 401) {
                console.log("setting token to expired");
                this.setState({tokenIsExpired: true});
            }
            console.log(error);
        });
    }
    componentDidMount() {
        this.refreshAndFetch();
    }

    handleViewRolesClick(user) {
        console.log(user);
        this.setState({showRoles: true, selectedRoles: user.roles});
    }
    render() {
        if(this.state.tokenIsExpired) {
            return <RefreshTokenBox onRefresh={this.refreshAndFetch} />
        }
        if(this.state.users.length == 0) {
            return (
                <div className='main-div'>
                    <h2 className="h2">Oops!</h2>
                    <p className='p'>No Data found.</p>
                </div>
            );
        }
        return (
            <div className="main-div">
                <BackgroundImage />
                
                <table>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Second Name</th>
                        <th>Roles</th>
                    </tr>
                {
                    this.state.users.map(user => (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>
                                <div>
                                    {
                                        user.roles.map(role => 
                                            <td>
                                            {
                                                <div className={role.toLowerCase() + "-image-sm"}></div>
                                            }
                                            </td>
                                        )
        
                                    }
                                </div>
                            </td>

                        </tr>
                    ))
                }
                </table>
            </div>

        );
    }
}

export default ViewUsers;
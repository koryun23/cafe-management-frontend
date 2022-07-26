import React from 'react';
import '../css/ViewUsers.css';
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
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
                            <h3>{user.username}</h3>
                            <p>{user.firstName + " " + user.secondName}</p>
                            <button text="Update" className="update-button">
                                Update
                            </button>
                            <button className="delete-button">
                                Delete<i className="fa fa-trash"></i>
                            </button>
                        </div>
                    ))
                }
            </div>

        );
    }
}

export default ViewUsers;
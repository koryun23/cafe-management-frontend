import React from 'react';
import '../css/ProfileSidenav.css';

class ProfileSidenav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    } 

    handleLogOut(event) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("role");
    }
    
    render() {
        return (
            <div>
                <a href="/"
                   onClick={this.handleLogOut}
                   className="log-out">
                    Log Out
                </a>
                <div className="sidenav">

                    <div className={this.props.userRole.toLowerCase() + "-image"}></div>
                        <Profile firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            username={this.props.username} />
                    </div>
                </div>

        );
    }
}

function Profile(props) {
    return (
        <div className="profile">
            <h3 className="username">{props.username}</h3>
            <p className="full-name">{props.firstName + " " + props.lastName}</p>
        </div>
    );
}

export default ProfileSidenav;
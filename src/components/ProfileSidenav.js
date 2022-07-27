import React from 'react';
import '../css/ProfileSidenav.css';

class ProfileSidenav extends React.Component {
    constructor(props) {
        super(props);
    } 

    render() {
        return (
            <div className="sidenav">
                <div className={this.props.userRole.toLowerCase() + "-image"}></div>
                <Profile firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        username={this.props.username} />
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
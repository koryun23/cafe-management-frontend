import React from 'react';

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                
            ]
        }
    }

    render() {
        return (<h1>View all users</h1>)
    }
}

export default ViewUsers;
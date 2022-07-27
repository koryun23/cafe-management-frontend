import React from 'react';
import ManagerHomePage from './ManagerHomePage.js';
import WaiterHomePage from './WaiterHomePage.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.userRole === 'MANAGER') {
            return <ManagerHomePage username={this.props.username}
                                    firstName={this.props.firstName} 
                                    lastName={this.props.lastName}/>
        }
        return <WaiterHomePage username={this.props.username}
                               firstName={this.props.firstName} 
                               lastName={this.props.lastName}/>
    }
}

export default HomePage;

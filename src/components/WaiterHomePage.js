import React from 'react';
import Menu from './Menu.js';
import WaiterMenu from './WaiterMenu.js';
import ProfileSidenav from './ProfileSidenav.js';
class WaiterHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

    render() {
        return (
            <div>
                <WaiterMenu />
                <ProfileSidenav username="mary21"
                                firstName="Mary"
                                lastName="Smith"
                                userRole="WAITER"/>
            </div>
        );
    }
}

export default WaiterHomePage;
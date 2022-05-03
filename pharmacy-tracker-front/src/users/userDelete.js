import React, { Component } from "react";
import { UserProfileButton } from '../components/UserProfileButton';

class UserDelete extends Component {

    render() {
        return (
        <div>
            
            <UserProfileButton />
            <span>Sure do you want to delete 123 account?</span>
        </div>);
    }
}

export default UserDelete;
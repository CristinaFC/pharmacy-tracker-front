import React, { Component } from "react";
import { ProfileButton } from '../components/ProfileButton';

class PharmacyDelete extends Component {

    render() {
        return (
        <div>
            
            <ProfileButton />
            <span>Sure do you want to delete account?</span>
        </div>);
    }
}

export default PharmacyDelete;
import Routing from '../routing/Routing';
import { Link } from 'react-router-dom';

export const UserUpdateButton = () => {
    return (
        <Link class="link " to={Routing.updateProfile}>
            <button type="link button" class="edit-button">Edit profile</button>
        </Link>
    );
}
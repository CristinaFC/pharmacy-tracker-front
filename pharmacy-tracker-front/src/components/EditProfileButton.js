import Routing from '../routing/Routing';
import { Link } from 'react-router-dom';

export const EditProfileButton = () => {
    return (
        <Link class="link " to={Routing.editProfile}>
            <button type="link button" class="edit-button">Edit profile</button>
        </Link>
    );
}
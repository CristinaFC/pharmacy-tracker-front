import Routing from '../routing/Routing';
import { Link } from 'react-router-dom';

export const UserProfileButton = () => {
    return (
        <Link class="link" to={Routing.userProfile}>
            <button class="profile-button" type='submit'>My profile</button>
        </Link>
    );
}
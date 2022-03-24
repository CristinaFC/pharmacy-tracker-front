import Routing from '../routing/Routing';
import { Link } from 'react-router-dom';

export const ProfileButton = () => {
    return (
        <Link class="link" to={Routing.myProfile}>
            <button class="profile-button" type='submit'>My profile</button>
        </Link>
    );
}
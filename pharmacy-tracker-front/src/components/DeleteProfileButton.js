import Routing from '../routing/Routing';
import { Link } from 'react-router-dom';

export const DeleteProfileButton = () => {
    return (
        <Link class="link" to={Routing.deleteProfile}>
            <button type="button" class="delete-button">Delete account</button>
        </Link>
    );
}
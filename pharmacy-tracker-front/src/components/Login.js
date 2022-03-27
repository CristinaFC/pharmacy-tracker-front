import React, {useState} from 'react'
import  { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
    const [user, setUser ] = useState({
        email: '',
        password: '',
    });

    const {login} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    };

    const handleSubmit = async (e)  => {
        e.preventDefault()
        setError('');
        try {
            await login(user.email, user.password);
            navigate('/');
        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <div>
            {error && <p >{error.message}</p>}

            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange = {handleChange}/>
                </div>
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                    onChange={handleChange}/>
                </div>
                <div>
                    <button> Login </button>
                </div>
            </form>
        </div>
  )
}

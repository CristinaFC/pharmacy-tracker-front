import React, {useState} from 'react'
import  { useAuth } from '../context/authContext';
import {useNavigate } from 'react-router-dom';

export default function Register() {
    
    const [user, setUser ] = useState({
        email: '',
        password: '',
    });

    const {signup} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    };

    const handleSubmit = async (e)  => {
        e.preventDefault()
        setError('');
        try {
            await signup(user.email, user.password);
            navigate('/');
        } catch(error) {
            setError(erorr.message);
        }
    }

    return (
        <div>
            {error && <p>{error.message}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlor="email">Email</label>
                <input type="email" name="email"
                onChange={handleChange}/>

                <label htmlor="email">Password</label>
                <input type="password" name="password" id="password"
                onChange={handleChange}/>

                <button> Register </button>
            </form>
        </div>
  )
}

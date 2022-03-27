import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        try {
            await login(user.email, user.password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div class="account-form">
            {error && <p >{error.message}</p>}
            <form onSubmit={handleSubmit}>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" name="email" onChange={handleChange} />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" class="btn-login">Login</button>
            </form>
        </div>
    )
}

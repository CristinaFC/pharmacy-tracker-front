import React, {useState} from 'react'
import  { useAuth } from '../context/authContext';
import {useNavigate } from 'react-router-dom';

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
        <div clasasname= "w-full max-w-xs m-auto">
            {error && <p class="bg-red-100 border border-red-400 text-red-700
             px-4 py-3 rounded relative mb-2 text-center">{error.message}</p>}

            <form onSubmit={handleSubmit} classname="bg-white
            shadow-md rounder px-8 pt-6 pb-8 mb-4">
                <div classname="mb-4">
                    <label htmlFor="email" classname="block text-gray-700
                    tex-sm font-fold mb-2">Email</label>
                    <input type="email" name="email" classname="shadow appearence-none border rounded 
                    w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-none focus:shadow-outline" onChange = {handleChange}/>
                </div>
                <div classname="mb-4">
                    <label htmlFor="password" classname="block text-gray-700
                    tex-sm font-fold mb-2">Password</label>
                    <input type="password" name="password" id="password" classname="shadow appearence-none border rounded 
                    w-full py-2 px-3 text-gray-700 leading-tight
                    focus:outline-none focus:shadow-outline"
                    onChange={handleChange}/>
                </div>
                <div classname="mb-4">
                    <button classname="bg-blue-500 hover:bg-blue-700
                    text-white font-bold py-2 px-4 rounded
                    focus:outline-none focus:shadow-outline"> Login </button>
                </div>
            </form>
        </div>
  )
}

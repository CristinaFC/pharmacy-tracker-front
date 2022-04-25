import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Routing from '../routing/Routing';
import RegisterPharm from './RegisterPharm';

export default function Register()
{

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [pharm, setPharm] = useState({
        address: '',
        city: '',
        owner: '',
        phone: '',
        eclosing: '',
        eopening: '',
        mclosing: '',
        mopening: '',
        npharmacy: '',
        lat: 28.105557,
        long: -15.422794,
    });

    const { signupUser, signupPharm } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [rol, setRol] = useState('');


    const handleChange = ({ target: { name, value } }) =>
    {
        setUser({ ...user, [name]: value });
    };

    const handleRol = ({ target: { value } }) =>
    {
        setRol(value);
    };

    const handleChangePharmacy = ({ target: { name, value } }) =>
    {
        setPharm({ ...pharm, [name]: value });
        { console.log('pharmacy', pharm); }
    };


    const handleSubmitUser = async (e) =>
    {
        e.preventDefault()
        setError('');
        try
        {
            await signupUser(user.email, user.password);
            navigate('/');
        } catch (error)
        {
            setError(error.message);
        }


    }
    const handleSubmitPharmacy = async (e) =>
    {
        e.preventDefault()
        setError('');
        try
        {
            console.log('data', pharm);
            await signupPharm(user.email,
                user.password,
                pharm.address,
                pharm.city,
                pharm.owner,
                pharm.phone,
                pharm.eclosing,
                pharm.eopening,
                pharm.mclosing,
                pharm.mopening,
                pharm.npharmacy,
                pharm.lat,
                pharm.long);
            navigate('/');
        } catch (error)
        {
            setError(error.message);
        }
    }



    return (
        <div class="account-form">
            {error && <p>{error.message}</p>}
            <form >
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" name="email" onChange={handleChange} required />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" name="password" id="password" onChange={handleChange} required />
                    </div>
                </div>
                <div required>
                    <input type="radio" value="pharmacy" id="male"
                        onChange={handleRol} name="rol" />
                    <label for="male">Pharmacy</label>

                    <input type="radio" value="user" id="female"
                        onChange={handleRol} name="rol" />
                    <label for="female">User</label>
                </div>
                {console.log('rol', rol)}
                {rol === "pharmacy"
                    ? <RegisterPharm handleSubmit={handleSubmitPharmacy} handleChange={handleChangePharmacy} />
                    : <button button type="submit" class="btn-register" onClick={handleSubmitUser}>Register</button>}
            </form>
        </div >
    )
}
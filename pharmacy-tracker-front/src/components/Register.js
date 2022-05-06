import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Routing from '../routing/Routing';
import RegisterPharm from './RegisterPharm';

export default function Register()
{

    const [user, setUser] = useState({
        fullname: '',
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
        lat: '',
        long: '',
    });

    const { signupUser, signupPharm } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [rol, setRol] = useState('');


    const handleChange = ({ target: { name, value } }) =>
    {
        setUser({ ...user, [name]: value });
    };

    function setLat  (value1, value2){

        setPharm({ ...pharm, lat : value1, long:value2 });
        console.log(pharm.lat);
        console.log(pharm.long)
    };
   
   /* function setLong  (value){

        setPharm({ ...pharm, long : value });
        console.log(value);
    }*/


    const handleRol = ({ target: { value } }) =>
    {
        setRol(value);
    };

    const handleChangePharmacy = ({ target: { name, value } }) =>
    {
        setPharm({ ...pharm, [name]: value });
        {
            console.log(name);
            console.log(value);
            
            console.log('pharmacy', pharm);

        }
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
        <div class="account-form2">
            {error && <p>{error.message}</p>}
            <form>
                <div id='reg1'>
                    <div class='title'>
                        <h1>Create Account</h1>
                    </div>

                    <div class="Rrow">
                        <input class="inputRegister" type="text" name="fullname" onChange={handleChange} required placeholder="Fullname" />
                    </div>

                    <div class="Rrow">
                        <input class="inputRegister" type="email" name="email" onChange={handleChange} required placeholder="Email" />
                    </div>
                    <div class="Rrow">
                        <input class="inputRegister" type="password" name="password" id="password" onChange={handleChange} required placeholder="Password" />
                    </div>
                    <div class="last-row">
                        <p stytle={{ margin: '0' }}>Create as:</p>
                        <div class="radios" required>
                            <input type="radio" value="user" id="user" onChange={handleRol} name="userType" />
                            <label style={{ margin: '0 100px 0 0' }} for="user">A User</label>
                            <input type="radio" value="pharmacy" id="pharmacy" name='userType' onChange={handleRol} />
                            <label for="phamarcy">A Phamarcy</label><br></br>
                        </div>
                    </div>
                </div>
                {console.log('rol', rol)}
                {rol === "pharmacy"
                    ? <RegisterPharm handleSubmit={handleSubmitPharmacy} handleChange={handleChangePharmacy} handleLat={setLat}  />
                    : <button button type="submit" class="btn-register" onClick={handleSubmitUser}>Register</button>}
            </form>
        </div >
    )
}
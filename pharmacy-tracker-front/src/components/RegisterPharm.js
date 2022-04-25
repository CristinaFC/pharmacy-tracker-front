import React, { useState } from 'react';
import 'firebase/auth';
import "./RegisterPharm.css";


export default function RegisterPharm({ handleSubmit, handleChange })
{

    /*const [ fullname, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');*/

    return (
        <div class="pharm-form">
            <form>
                <div className='row'>
                    <div className='header' >
                        <h2>Pharmacy Information</h2>
                        <p>Please enter your's Pharmacy data</p>
                    </div>

                    <div className='inputDivs'>
                        <div className='elements'>
                            <label for="phone">Phone</label>
                            <input style={{ width: '373px' }} type="Number" name="phone" placeholder='' onChange={handleChange} />
                        </div>
                        <div className='elements'>
                            <label for="city">City</label>
                            <input style={{ width: '373px' }} type="text" name="city" placeholder='' onChange={handleChange} />
                        </div>
                        <div className='elements'>
                            <label for="address">Address</label>
                            <input style={{ width: '373px' }} type="address" name="address" placeholder='' onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='row2'>
                    <div className='sideHeader' >
                        <h2>Set Time</h2>
                        <p>Please Enter your opening hours</p>
                    </div>
                    <div className='inputDivs'>
                        <div className='elements'>
                            <label for="Mo">Morning Opening</label>
                            <input style={{ width: '136px' }} type="time" name="mopening" placeholder='' onChange={handleChange} />
                        </div>
                        <div className='elements'>
                            <label for="Mc">Morning Closing</label>
                            <input style={{ width: '136px' }} type="time" name="mclosing" placeholder='' onChange={handleChange} />
                        </div>
                        <div className='elements'>
                            <label for="Eo">Evening Opening</label>
                            <input style={{ width: '136px' }} type="time" name="eopening" placeholder='' onChange={handleChange} />
                        </div>
                        <div className='elements'>
                            <label for="Ec">Evening Closing</label>
                            <input style={{ width: '136px' }} type="time" name="eclosing" placeholder='' onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='row3'>
                    <div className='sideHeader' >
                        <h2>Set Location</h2>
                        <p>Please enter exactly location of pharmacy </p>
                    </div>
                    <div className='inputDivs'>
                        <div className='elements'>
                            <label for="lat">Latitude</label>
                            <input style={{ width: '373px' }} type="Number" step="any" name="lat" placeholder='' />
                        </div>
                        <div className='elements'>
                            <label for="long">Longitude</label>
                            <input style={{ width: '373px' }} type="Number" step="any" name="long" placeholder='' />
                        </div>
                    </div>
                </div>
                <div className='buttom'>
                    <button type="submit" onClick={handleSubmit}>Register</button>
                </div>


            </form>
        </div>
    )
}
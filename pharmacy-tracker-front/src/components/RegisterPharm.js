import React, { useState } from 'react';
import 'firebase/auth';
import "./RegisterPharm.css";
import L from 'leaflet';
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { myIcon } from '../assets/icons/icons';

var marker;
var aux;

export default function RegisterPharm({ handleSubmit, handleChange })
{   

const [startPosition, setStartPosition] = useState(0,0);

function setPosition(aux){
    if(aux){
        return setStartPosition(aux)
    }
        alert("Click on the map to set Location");
}
const MapAux = () =>
{
    
    const styleMap = { "width": "60%", "height": "50vh"};

    const LocationPlacer = () =>
    {
        const map = useMapEvents({
            click(e)
            {
                if(marker){
                    map.removeLayer(marker);
                    console.log("Mark")
                }
                marker = new L.Marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: myIcon });
                map.addLayer(marker);
                aux=e.latlng;
                setStartPosition(aux)
            },
        });
        
        console.log('startPosition', startPosition);
        return null;
    };

    
        return (
        <>
            <MapContainer
                style={styleMap}
                center={[28.112067, -15.439845,]}
                zoom={13}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                <LocationPlacer/>
            </MapContainer>
        </>
        )

    }

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
                        <p>Click on the map to set the location </p>
                    </div>
                    <div className='inputDivs'>
                         <MapAux/>
                         <div className='buttom'>
                            <button type="submit" onClick={handleSubmit}>Register</button>
                        </div>
                    </div>  
                </div>
                <p> {startPosition.lat} {startPosition.lng} </p>
                <button  onClick={()=> setPosition(aux)}>Set Pharmacy Position</button>
            </form>
        </div>
    )
}

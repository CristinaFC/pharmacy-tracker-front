import React, { Component } from 'react';
import MapView from '../map/MapView';
import { useAuth } from '../context/authContext'


export function Home() {
    const { user } = useAuth();

    return (
        <div>
            <MapView/>
        </div>
    );
}

export default Home;
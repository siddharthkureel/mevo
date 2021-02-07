import React, { useLayoutEffect, useState } from 'react';

import http from '../api';
import Map from '../components/Map';

const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    const [homeZones, setHomeZones] = useState([]);

    useLayoutEffect(() => {
        const fetchData = async() => {
            const result = await http.get('/public/vehicles/all');
            const result2 = await http.get('/public/home-zones/all');
            setVehicles(vehicles.concat(result.data));
            setHomeZones(homeZones.concat(result2.data));
        }
        fetchData()
    }, []);
    
    const handleClosestCar = async () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        const success = async (pos) => {
            const crd = pos.coords;
        }
        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
          
    }

    return (
        <div>
            {/* <button onClick={handleAllVehicles} >Get all vehicles</button>
            <button onClick={handleClosestCar} >find Closest Car</button> */}
            <Map vehicles={vehicles} homeZones={homeZones} />
        </div>
    );
}

export default Home;

import React, { useLayoutEffect, useState } from 'react';
import { point } from '@turf/helpers';
import distance from '@turf/distance';

import http from '../api';
import Map from '../components/Map';

const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    const [homeZones, setHomeZones] = useState([]);

    const [toggle, setToggle] = useState(false);

    useLayoutEffect(() => {
        const fetchData = async () => {
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
            const { latitude, longitude } = pos.coords;
            const newData = vehicles.map((vehicle)=>{
                const from = point([latitude, longitude]);
                const to = point([vehicle.position.latitude, vehicle.position.longitude]);
                const d = distance(from, to);
                return {
                    ...vehicle,
                    distance: d
                }
            })
            const ascendingOrder = newData.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));;
            setVehicles(ascendingOrder);
            setToggle(true);
        }
        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
          
    }

    return (
        <div>
            <div>
                <div style={styles.container} >
                    <button style={styles.button} onClick={handleClosestCar} >Closet Car</button>
                    {
                        toggle ? 
                        <>
                            <span style={styles.first} >1st closest car</span>
                            <span style={styles.second} >2nd closest car</span>
                            <span style={styles.third} >3rd closest car</span>
                        </>
                        :null
                    }
                </div>
            </div>
            <Map vehicles={vehicles} homeZones={homeZones} />
        </div>
    );
}

const styles = {
    container: {
        position: "absolute", 
        display: "grid", 
        zIndex: "999"
    },
    button: {
        backgroundColor: "#4CAF50", 
        border: "none", 
        color: "white", 
        padding: "15px 32px", 
        textAlign: "center", 
        textDecoration: "none", 
        display: "inline-block", 
        fontSize: "16px",
    },
    first: {
        border: '2px solid green',
        margin: '0 10px'
    },
    second: {
        border: '2px solid yellow',
        margin: '0 10px'
    },
    third: {
        border: '2px solid orange',
        margin: '0 10px'
    }
}

export default Home;
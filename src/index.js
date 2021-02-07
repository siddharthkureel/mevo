import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from "mapbox-gl";

import App from './App';

mapboxgl.accessToken = "pk.eyJ1Ijoiam95a3VyZWVsIiwiYSI6ImNqeGkwdWJ0dzBsOW8zb3FuNmR1bTVjaXgifQ.0GdRQFY_wEcgkutrWXksyQ";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
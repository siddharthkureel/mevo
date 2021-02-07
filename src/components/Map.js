import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ vehicles, homeZones }) => {
    const node = useRef(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: node.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [174.745, -41.310],
            zoom: 12,
        });

        vehicles.forEach((vehicle) => {

            const { iconUrl, position } = vehicle;
            const { longitude, latitude } = position;
            var el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(${iconUrl})`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center top'
            el.style.width = '22px';
            el.style.height = '31px';

            new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(map);
        });
        if(homeZones[0]){
            map.on('load', function() {
                const { geometry } = homeZones[0].data;
                console.log(geometry)
                map.addSource('maine', {
                    'type': 'geojson',
                    'data': {
                    'type': 'Feature',
                    'geometry': { ...geometry }
                    }
                });
                map.addLayer({
                    'id': 'maine',
                    'type': 'line',
                    'source': 'maine',
                    'layout': {},
                    'paint': {
                    'line-color': '#088',
                    'line-width': 2
                    }
                });
            });        
        }
    }, [vehicles, homeZones]);
    return (
        <div>
        <div ref={node} style={styles} />
        </div>
    );
}

const styles = {
  width: "98.25vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

export default Map;
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

        vehicles.forEach((vehicle, i) => {
            const { iconUrl, position } = vehicle;
            const { longitude, latitude } = position;
            var el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(${iconUrl})`;
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center top'
            el.style.width = '22px';
            el.style.height = '31px';

            if(vehicle.distance && i===0){
                el.style.border = '2px solid green'
            }
            if(vehicle.distance && i===1){
                el.style.border = '2px solid yellow'
            }
            if(vehicle.distance && i===2){
                el.style.border = '2px solid orange'
            }
            
            new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(map);
        });
        map.on('click', function(e) {
            const { lat, lng } = e.lngLat;
            map.flyTo({center: [lng, lat], zoom: 16});
            setTimeout(() => {
                rotateCamera(0);
            }, 3000);
        });

        if(homeZones[0]){
            map.on('load', function() {
                const { geometry } = homeZones[0].data;
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
        map.on('load', function () {
            // Insert the layer beneath any symbol layer.
            var layers = map.getStyle().layers;
             
            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }
             
            map.addLayer(
            {
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
                    
                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                        ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
            );
        });
        function rotateCamera(timestamp) {
            // clamp the rotation between 0 -360 degrees
            // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        map.rotateTo((timestamp / 100) % 360, { duration: 0 });
        // Request the next frame of the animation.
        requestAnimationFrame(rotateCamera);
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
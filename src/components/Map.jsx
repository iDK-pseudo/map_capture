import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import API from "../utils/API.js";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "../styles.css"

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom,
    boxZoom: false,
    scrollZoom: true,
    terrain: {'source': 'mapbox-dem', 'exaggeration': 1.5}
    });

    map.current.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })
    );
  });

  const handleCapture = async (event) => {
    const bbox = [...map.current.getBounds().toArray()[0],...map.current.getBounds().toArray()[1]];
    const height = Math.floor(map.current.transform.height);
    const width = Math.floor(map.current.transform.width);
    const image_url = await API.getStaticImage(bbox, height, width);
    console.log(image_url);
    props.handleCapture(image_url);
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <button className="capture-btn" onClick={handleCapture}>Capture</button>
    </div>
  );
}
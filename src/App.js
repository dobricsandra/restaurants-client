import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
    const [lat, setLat] = useState(null);
    const [lng, setLong] = useState(null);
    const [data, setData] = useState(null);
    const [closest, setClosest] = useState(null);




    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { setLat(position.coords.latitude); setLong(position.coords.longitude); console.log(position.coords) }, (err) => { console.log(err) }, { timeout: 10000 });
        }

        async function fetchData() {
            const response = await axios.get("http://localhost:3000/coordinates");
            if (response.data) {
                setData(response.data);
                setClosest(response.data?.[0].Coordinates);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        console.log(lat, lng, closest, "------")
        async function showDirections() {
            await window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${closest}&travelmode=driving`);
        }
        if (lat && lng && closest) {
            {
                showDirections();
            }
        }


    }, [lat, lng, closest])


    return (
        <div>
            Hello
        </div>
    );
}

export default App;

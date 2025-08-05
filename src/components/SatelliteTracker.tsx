import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const SatelliteTracker = () => {
    const [selectedSatellite, setSelectedSatellite] = useState<string | null>(null);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
    const [satelliteData, setSatelliteData] = useState<any>(null);
    const [satellitePosition, setSatellitePosition] = useState<any>(null);
    const [lat, setLat] = useState<number>(0); // Replace with actual lat
    const [lng, setLng] = useState<number>(0); // Replace with actual lng
    const [alt, setAlt] = useState<number>(0); // Replace with actual alt

    const handleRecaptchaChange = (value: string | null) => {
        if (value) {
            setIsCaptchaVerified(true);
        } else {
            setIsCaptchaVerified(false);
        }
    };

    const handleSatelliteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSatellite(e.target.value);
    };

    const fetchSatelliteData = async () => {
        if (!isCaptchaVerified) {
            alert('Please complete the CAPTCHA before fetching data.');
            return;
        }

        if (!selectedSatellite) {
            alert('Please select a satellite first.');
            return;
        }

        try {
            // Fetch satellite position using satid as a query param
            const response = await axios.get('/api/position', {
                params: { satid: selectedSatellite, lat, lng, alt }
            });
            setSatellitePosition(response.data);
        } catch (error) {
            console.error('Error fetching satellite position:', error);
        }
    };

    const fetchSatellites = async () => {
        if (!lat || !lng || !alt) {
            alert('Please provide latitude, longitude, and altitude.');
            return;
        }

        try {
            // Fetch satellites above a location
            const response = await axios.get('/api/satellites', {
                params: { lat, lng, alt }
            });
            setSatelliteData(response.data);
        } catch (error) {
            console.error('Error fetching satellites:', error);
        }
    };

    return (
        <div className="satellite-tracker-container">
            <h3>Satellite Tracker</h3>

            {/* Latitude, Longitude, and Altitude Input */}
            <div>
                <label>Latitude:</label>
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(Number(e.target.value))}
                    placeholder="Enter latitude"
                />
            </div>
            <div>
                <label>Longitude:</label>
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(Number(e.target.value))}
                    placeholder="Enter longitude"
                />
            </div>
            <div>
                <label>Altitude:</label>
                <input
                    type="number"
                    value={alt}
                    onChange={(e) => setAlt(Number(e.target.value))}
                    placeholder="Enter altitude"
                />
            </div>

            {/* Google reCAPTCHA */}
            <ReCAPTCHA
                sitekey="YOUR_SITE_KEY"  // Replace with your Google reCAPTCHA site key
                onChange={handleRecaptchaChange}
            />

            {/* Fetch Satellites Button */}
            <button onClick={fetchSatellites} disabled={!isCaptchaVerified}>
                Fetch Satellites
            </button>

            {/* Satellite Selection */}
            {satelliteData && (
                <>
                    <label htmlFor="satellite-select">Choose a Satellite:</label>
                    <select
                        id="satellite-select"
                        value={selectedSatellite || ''}
                        onChange={handleSatelliteSelect}
                    >
                        <option value="">Select a Satellite</option>
                        {satelliteData.satellites.map((sat: any) => (
                            <option key={sat.satid} value={sat.satid}>
                                {sat.satname}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {/* Fetch Satellite Data Button */}
            <button onClick={fetchSatelliteData} disabled={!isCaptchaVerified || !selectedSatellite}>
                Fetch Satellite Position
            </button>

            {/* Display Satellite Data */}
            {satellitePosition && (
                <div>
                    <h4>Satellite Position:</h4>
                    <pre>{JSON.stringify(satellitePosition, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SatelliteTracker;

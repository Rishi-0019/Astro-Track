import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import Select from 'react-select';
import {
  FaSun,
  FaMoon,
  FaRocket,
  FaSatellite,
  FaExclamationTriangle,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import './Dashboard.css';
import StarBackground from '../components/StarBackground';
import MeteorFX from '../components/MeteorFX';
import GalaxyFX from '../components/GalaxyFX';
import { fetchSatellites, fetchSatellitePosition } from '../utils/api';

interface Satellite {
  satid: number;
  satname: string;
}

interface TrackedSatellite {
  satid: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  locationName: string;
  speed: number;
  purpose: string;
  lastLat?: number;
  lastLng?: number;
  lastTimestamp?: number;
}

interface News {
  title: string;
  description: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [selectedSatellites, setSelectedSatellites] = useState<Satellite[]>([]);
  const [satellitePositions, setSatellitePositions] = useState<TrackedSatellite[]>([]);
  const [loading, setLoading] = useState({ satellites: false, position: false });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [mapStyle, setMapStyle] = useState<'night' | 'day' | 'space'>('night');
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const globeEl = useRef<any>(null);

  useEffect(() => {
    getSatellites();
    getSpaceNews();
    const clock = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(clock);
    // eslint-disable-next-line
  }, []);

  const getSatellites = async () => {
    try {
      setLoading(prev => ({ ...prev, satellites: true }));
      const data = await fetchSatellites(28.6139, 77.2090, 0.1);
      setSatellites(data.above || []);
    } catch (err) {
      setError('Failed to fetch satellites.');
    } finally {
      setLoading(prev => ({ ...prev, satellites: false }));
    }
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const getLocationName = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return data.display_name || 'Unknown';
    } catch {
      return 'Unknown';
    }
  };

  const getSatellitePositions = async () => {
    setLoading(prev => ({ ...prev, position: true }));
    const now = Date.now();
    const positions: TrackedSatellite[] = [];

    for (const sat of selectedSatellites) {
      const data = await fetchSatellitePosition(sat.satid);
      const pos = data.positions?.[0];
      if (!pos) continue;
      const last = satellitePositions.find(s => s.satid === sat.satid);
      const locationName = await getLocationName(pos.satlatitude, pos.satlongitude);

      const speed =
        last?.lastTimestamp && now - last.lastTimestamp > 0
          ? haversineDistance(last.latitude, last.longitude, pos.satlatitude, pos.satlongitude) /
            ((now - last.lastTimestamp) / 3600000)
          : 0;

      positions.push({
        satid: sat.satid,
        name: sat.satname,
        latitude: pos.satlatitude,
        longitude: pos.satlongitude,
        altitude: pos.sataltitude,
        locationName,
        speed,
        purpose: 'Weather Monitoring',
        lastLat: pos.satlatitude,
        lastLng: pos.satlongitude,
        lastTimestamp: now,
      });
    }

    setSatellitePositions(positions);
    setLoading(prev => ({ ...prev, position: false }));
  };

  const handleSatelliteChange = (options: any) => {
    const selected = options ? options.map((o: any) => ({ satid: o.value, satname: o.label })) : [];
    setSelectedSatellites(selected.slice(0, 5));
  };

  const handleTrackSatellites = () => {
    if (selectedSatellites.length && captchaToken) {
      getSatellitePositions();
    } else {
      setError('Please select satellites and complete captcha.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const getSpaceNews = async () => {
    try {
      const res = await fetch('https://api.spaceflightnewsapi.net/api/v1/articles');
      const data = await res.json();
      setNews(data || []);
    } catch (err) {
      console.error('News fetch failed', err);
    }
  };

  const getMapImage = () =>
    ({
      day: '//unpkg.com/three-globe/example/img/earth-day.jpg',
      night: '//unpkg.com/three-globe/example/img/earth-night.jpg',
      space: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    }[mapStyle]);

  return (
    <div className="dashboard-container">
      <StarBackground />
      <MeteorFX />
      <GalaxyFX />

      <header className="dashboard-header glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Twinkling cosmic glitter */}
          <div className="header-stars" />
          <span className="header-title">
            <span style={{ letterSpacing: 4 }}>AstroTrack</span>
            <FaSatellite
              style={{
                marginLeft: 14,
                fontSize: 32,
                color: '#4f8cff',
                filter: 'drop-shadow(0 0 10px #00f5d4)',
              }}
            />
          </span>
        </div>
        <div className="header-controls">
          <button
            title="Toggle Map Style"
            onClick={() =>
              setMapStyle(mapStyle === 'night' ? 'day' : mapStyle === 'day' ? 'space' : 'night')
            }
          >
            {mapStyle === 'night' ? <FaMoon /> : mapStyle === 'day' ? <FaSun /> : <FaRocket />}
          </button>
          <span className="clock">{currentTime}</span>
          <button onClick={() => navigate('/profile')}>
            <FaUserCircle style={{ marginRight: 6 }} /> Profile
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
      </header>

      <main className="main-layout">
        <section className="tracker-section glass">
          <Select
            placeholder="Select up to 5 satellites"
            isMulti
            onChange={handleSatelliteChange}
            options={satellites.map(s => ({ value: s.satid, label: s.satname }))}
            isLoading={loading.satellites}
          />
          <HCaptcha sitekey="04086578-873e-4f9e-85b0-a7fcbdb2c996" onVerify={setCaptchaToken} />
          <button
            className="track-satellites-button"
            disabled={loading.position || !selectedSatellites.length || !captchaToken}
            onClick={handleTrackSatellites}
          >
            {loading.position ? 'Tracking...' : 'Track Satellites'}
          </button>
          {error && (
            <p className="error-message">
              <FaExclamationTriangle /> {error}
            </p>
          )}

          <div className="satellite-info-section">
            {satellitePositions.map(sat => (
              <div key={sat.satid} className="satellite-card glass">
                <h3>🛰️ {sat.name}</h3>
                <p>Lat: {sat.latitude.toFixed(4)}°</p>
                <p>Lng: {sat.longitude.toFixed(4)}°</p>
                <p>Alt: {sat.altitude.toFixed(2)} km</p>
                <p>Location: {sat.locationName}</p>
                <p>Speed: {sat.speed.toFixed(2)} km/h</p>
                <p>Purpose: {sat.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="globe-news-section">
          <div className="globe-container full-size-globe">
            <Globe
              ref={globeEl}
              globeImageUrl={getMapImage()}
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              backgroundColor="#000000"
              showGraticules={true}
              showAtmosphere={true}
              atmosphereAltitude={0.2}
              atmosphereColor="lightskyblue"
              pointLabel="name"
              pointAltitude={(d: any) => d.altitude / 10}
              pointsData={satellitePositions.map(sat => ({
                lat: sat.latitude,
                lng: sat.longitude,
                altitude: sat.altitude,
                name: sat.name,
              }))}
              width={window.innerWidth * 0.7}
              height={window.innerHeight * 0.6}
            />
          </div>

          <div className="news-section glass news-feed">
            <h3>Latest Space News</h3>
            <div className="news-list">
              {news.map((n, idx) => (
                <div key={idx} className="news-item">
                  <h4>
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      {n.title}
                    </a>
                  </h4>
                  <p>{n.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

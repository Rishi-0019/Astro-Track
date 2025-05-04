const BASE_URL = 'http://localhost:5050/api';

export const fetchSatellites = async (lat: number, lng: number, alt: number) => {
  const res = await fetch(`${BASE_URL}/satellites?lat=${lat}&lng=${lng}&alt=${alt}`);
  if (!res.ok) throw new Error('Failed to fetch satellites');
  return res.json();
};

export const fetchSatellitePosition = async (satid: number) => {
  const res = await fetch(`${BASE_URL}/position/${satid}?lat=28.6139&lng=77.2090&alt=0.1`);
  if (!res.ok) throw new Error('Failed to fetch satellite position');
  return res.json();
};

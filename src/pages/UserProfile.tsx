import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { getUserProfile } from '../utils/firebase';
import './UserProfile.css';
import { FaUserAstronaut } from 'react-icons/fa';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchesUsed, setSearchesUsed] = useState<number>(0);
  const [searchesLeft, setSearchesLeft] = useState<number>(50);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [lastSearchDate, setLastSearchDate] = useState<string>('Not available');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        setUser(userData);
        try {
          const profile = await getUserProfile(userData);
          console.log('User profile fetched:', profile);

          if (profile) {
            const left = profile.searchCount ?? 50;
            setSearchesLeft(left);
            setSearchesUsed(50 - left);
            setRecentSearches(profile.recentSearches ?? []);
            setLastSearchDate(profile.lastSearchDate ?? 'Not available');
          } else {
            console.warn('No profile found for user.');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return <div className="user-profile-container">Loading...</div>;
  }

  if (!user) {
    return <div className="user-profile-container">User not found.</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <FaUserAstronaut className="profile-icon" />
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user.displayName || 'Anonymous'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
        <p><strong>Searches Used:</strong> {searchesUsed}</p>
        <p><strong>Searches Left:</strong> {searchesLeft}</p>
        <p><strong>Recent Searches:</strong> {recentSearches.length > 0 ? recentSearches.join(', ') : 'None'}</p>
        <p><strong>Last Search Date:</strong> {lastSearchDate}</p>
        <div className="user-profile-buttons">
          <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

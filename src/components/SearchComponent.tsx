import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase'; // Firebase auth
import { getUserProfile, updateUserProfile } from '../utils/firebase'; // Firebase functions to fetch and update user profile

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);  // Firebase user
  const maxSearches = 5;  // Set your limit here

  // Get current user data from Firebase
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      // Fetch user profile from Firestore
      getUserProfile(currentUser).then((profile) => {
        if (profile) {
          setSearchCount(profile.searchCount || 0);
          setRecentSearches(profile.recentSearches || []);
        }
      });
    }
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    if (!user) {
      setError('User not authenticated!');
      return;
    }
    if (searchCount >= maxSearches) {
      setError('You have reached the maximum number of searches.');
      return;
    }
    if (!searchQuery.trim()) {
      setError('Please enter a valid search query.');
      return;
    }

    try {
      await updateUserProfile(user, searchQuery);
      setSearchCount((prev) => prev + 1);  // Increment search count on new search
      setRecentSearches((prev) => [searchQuery, ...prev].slice(0, maxSearches));
      setSearchQuery('');  // Clear the search input field
      setError('');
    } catch (err) {
      setError('Failed to update search information');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <h3>Search for Satellites</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        disabled={searchCount >= maxSearches}  // Disable input if limit is reached
        placeholder="Enter search query"
      />
      <button
        onClick={handleSearch}
        disabled={searchCount >= maxSearches}  // Disable button if limit is reached
      >
        Search
      </button>

      {error && <p className="error">{error}</p>}

      <p>{`You have made ${searchCount} search${searchCount !== 1 ? 'es' : ''} out of ${maxSearches}.`}</p>
      {searchCount >= maxSearches && <p>You have reached the maximum search limit.</p>}

      <h4>Recent Searches</h4>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;

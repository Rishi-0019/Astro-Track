import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Create user profile on first registration
export const createUserProfile = async (user: any) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Generate a unique username if it doesn't exist
      const username = user.displayName || `User_${user.uid}`;

      await setDoc(userRef, {
        name: user.displayName || user.email,
        email: user.email,
        username, // Store the username
        searchCount: 50,
        recentSearches: [],
        lastSearchDate: new Date().toISOString().split('T')[0],
      });

      console.log('User profile created in Firestore.');
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

// Update user profile after a search
export const updateUserProfile = async (user: any, searchedSatellite: string) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn('User profile does not exist.');
      return;
    }

    const userData = userSnap.data();
    const currentDate = new Date().toISOString().split('T')[0];
    const lastSearchDate = userData.lastSearchDate || '';
    let searchCount = userData.searchCount ?? 50;

    if (currentDate !== lastSearchDate) {
      // Reset search count and recent searches for a new day
      await updateDoc(userRef, {
        searchCount: 49,
        recentSearches: [searchedSatellite],
        lastSearchDate: currentDate,
      });
      console.log('New day — search count reset.');
    } else {
      if (searchCount > 0) {
        // Limit the recentSearches to the latest 5 searches
        const updatedRecentSearches = userData.recentSearches
          ? [searchedSatellite, ...userData.recentSearches]
          : [searchedSatellite];

        await updateDoc(userRef, {
          searchCount: searchCount - 1,
          recentSearches: updatedRecentSearches.slice(0, 5), // Limit to 5 recent searches
        });
        console.log(`Search recorded: ${searchedSatellite}`);
      } else {
        console.warn('No searches left for today.');
      }
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Get user profile
export const getUserProfile = async (user: any) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn('User profile not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

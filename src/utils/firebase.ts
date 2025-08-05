import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Auth, Firestore and Realtime Database instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);

// Create user profile on registration
export const createUserProfile = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const username = user.displayName || `User_${user.uid}`;
      await setDoc(userRef, {
        name: user.displayName || user.email,
        email: user.email,
        username,
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
export const updateUserProfile = async (user: User, searchedSatellite: string) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn('User profile does not exist.');
      return;
    }

    const userData = userSnap.data();
    const currentDate = new Date().toISOString().split('T')[0];
    const lastSearchDate = userData?.lastSearchDate || '';
    let searchCount = userData?.searchCount ?? 50;

    if (currentDate !== lastSearchDate) {
      await updateDoc(userRef, {
        searchCount: 49,
        recentSearches: [searchedSatellite],
        lastSearchDate: currentDate,
      });
      console.log('New day — search count reset.');
    } else {
      if (searchCount > 0) {
        const updatedRecentSearches = userData?.recentSearches
          ? [searchedSatellite, ...userData.recentSearches]
          : [searchedSatellite];

        await updateDoc(userRef, {
          searchCount: searchCount - 1,
          recentSearches: updatedRecentSearches.slice(0, 5),
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
export const getUserProfile = async (user: User) => {
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

// Send a chat message to Realtime Database
export const sendMessageToChat = async (message: string, userId: string) => {
  try {
    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      userId,
      message,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Fetch chat messages in real-time
export const fetchMessagesFromChat = (callback: (messages: any[]) => void) => {
  const messagesRef = ref(database, 'messages');
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const messagesArray = data ? Object.values(data) : [];
    callback(messagesArray);
  });
  return () => unsubscribe();
};

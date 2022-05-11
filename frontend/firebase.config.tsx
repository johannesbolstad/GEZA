import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

//The Firebase config file. Can easily be replaced if the app should be connected to another Firebase project.
export const firebaseConfig = {
    apiKey: 'AIzaSyAwBrkrMtyAnsnk4cDfbDa-VhRGIgSRpEY',
    authDomain: 'genbi-7f5f8.firebaseapp.com',
    databaseURL:
        'https://genbi-7f5f8-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'genbi-7f5f8',
    storageBucket: 'genbi-7f5f8.appspot.com',
    messagingSenderId: '86664652817',
    appId: '1:86664652817:web:e7ba20fe53a7e58f8329b0'
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const storage = getStorage();
export const auth = getAuth();

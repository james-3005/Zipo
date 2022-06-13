import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = require('../../firebaseConfig.json');

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, 'gs://zipe-a24b9.appspot.com');

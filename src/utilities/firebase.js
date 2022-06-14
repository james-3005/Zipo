import { initializeApp } from 'firebase/app';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';

const firebaseConfig = require('../../firebaseConfig.json');

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, 'gs://zipe-a24b9.appspot.com');

export const uploadImage = async (image, setImageURL) => {
  let result = await fetch(image);
  const name = new Date().getTime() + image;
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, await result.blob());
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setImageURL(downloadURL);
      });
    },
  );
};

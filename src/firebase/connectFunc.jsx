import { storage } from './firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImageToFirebaseStorage = async (file) => {
  try {
    const storageRef = ref(storage, 'images/' + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export {uploadImageToFirebaseStorage}
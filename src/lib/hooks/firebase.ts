import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase'; // Ajusta la ruta según tu estructura

export const UseUploadImage = async (file: File, path: string) => {
    const fileRef = ref(storage, path);
    try {
        await uploadBytes(fileRef, file);

        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw new Error('Error al subir la imagen');
    }
};

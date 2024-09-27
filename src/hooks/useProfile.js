import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useProfile = () => {
  const currentUser = useQuery(api.auth.currentUser);
  const updateProfile = useMutation(api.profile.update);

  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.name || '');
      setImageUrl(currentUser.image || '');
      setPreviewImage(currentUser.image || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        image: imageUrl,
        userId: currentUser._id,
        name: username
      });
      return true;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del profilo:', error);
      return false;
    }
  };

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
    setPreviewImage(url);
  };

  
  const resetToOriginalValues = () => {
    if (currentUser) {
      setUsername(currentUser.name || '');
      setImageUrl(currentUser.image || '');
      setPreviewImage(currentUser.image || '');
    }
  };

  return {
    currentUser,
    username,
    setUsername,
    imageUrl,
    setImageUrl,
    previewImage,
    setPreviewImage,
    handleSubmit,
    handleImageUrlChange,
    resetToOriginalValues
  };
};
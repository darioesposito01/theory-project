// hooks/useDeleteAccount.js
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '@convex-dev/auth/react';
import { api } from '../../convex/_generated/api';

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthActions();
  const deleteAccount = useMutation(api.auth.deleteAccount);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteAccount = async (userId) => {
    if (!userId) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await signOut();
      await deleteAccount({ userId });
      navigate('/');
    } catch (error) {
      console.error('Errore durante la cancellazione dell\'account:', error);
      setDeleteError('Si è verificato un errore durante la cancellazione dell\'account. Riprova più tardi.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    isDeleting,
    deleteError,
    handleDeleteAccount
  };
};
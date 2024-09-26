import  { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useDeleteAccount } from '../hooks/useDeleteAccount';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    currentUser,
    username,
    setUsername,
    imageUrl,
    previewImage,
    handleSubmit,
    handleImageUrlChange
  } = useProfile();

  const {
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    isDeleting,
    deleteError,
    handleDeleteAccount
  } = useDeleteAccount();

  if (!currentUser) return <div className="flex justify-center items-center h-screen">Caricamento...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Il Tuo Profilo</h1>
      {isEditing ? (
        <form onSubmit={(e) => {
          if (handleSubmit(e)) setIsEditing(false);
        }} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Nome utente</label>
            <input
              type="text"
              id="username"
              className="input input-bordered w-full max-w-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900">URL Immagine Profilo</label>
            <input
              type="url"
              id="imageUrl"
              className="input input-bordered w-full max-w-md"
              value={imageUrl}
              onChange={(e) => handleImageUrlChange(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-900">Anteprima Immagine</p>
            <img 
              src={previewImage || 'https://via.placeholder.com/150'} 
              alt="Anteprima profilo" 
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn" onClick={() => setIsEditing(false)}>Annulla</button>
            <button type="submit" className="btn btn-primary">Salva Modifiche</button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img 
              src={imageUrl || 'https://via.placeholder.com/150'} 
              alt="Immagine profilo" 
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div className='flex-col'>
              <div>
                <h2 className="text-2xl font-semibold">{username}</h2>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{currentUser.email}</h2>
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Modifica Profilo</button>
            <button className="btn btn-error" onClick={() => setShowDeleteConfirmation(true)}>Elimina Account</button>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={() => handleDeleteAccount(currentUser._id)}
          onCancel={() => setShowDeleteConfirmation(false)}
          isDeleting={isDeleting}
          deleteError={deleteError}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const DeleteConfirmationModal = ({ onConfirm, onCancel, isDeleting, deleteError }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4">Conferma Eliminazione Account</h2>
      <p className="mb-4">Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile e tutti i tuoi dati verranno eliminati permanentemente.</p>
      {deleteError && (
        <p className="text-red-500 mb-4">{deleteError}</p>
      )}
      <div className="flex justify-end space-x-2">
        <button 
          className="btn" 
          onClick={onCancel}
          disabled={isDeleting}
        >
          Annulla
        </button>
        <button 
          className="btn btn-error" 
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Eliminazione in corso...' : 'Conferma Eliminazione'}
        </button>
      </div>
    </div>
  </div>
);

export default Profile;
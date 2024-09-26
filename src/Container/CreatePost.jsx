// src/components/Posts/PostCreate.js
import { useMutation, useQuery } from 'convex/react';
import {api} from '../../convex/_generated/api'
import { useState } from 'react';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')

  const createPost = useMutation(api.posts.create);

  const currentUser = useQuery(api.auth.currentUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await createPost({ userId:currentUser._id, title, content });
      setContent('');
      setTitle('')
      alert('Post creato con successo!');
    } catch (error) {
      alert('Errore durante la creazione del post: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Cosa stai pensando?"
        required
      />
      <button type="submit">Pubblica</button>
    </form>
  );
};

export default CreatePost;
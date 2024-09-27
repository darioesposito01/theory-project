import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api'
import { useState } from 'react';
import { PenTool, Send } from 'lucide-react';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const createPost = useMutation(api.posts.create);
  const currentUser = useQuery(api.auth.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ userId: currentUser._id, title, content });
      setContent('');
      setTitle('');
      alert('Post creato con successo!');
    } catch (error) {
      alert('Errore durante la creazione del post: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex items-center">
            <PenTool className="mr-2" />
            Crea un nuovo post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Titolo</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Inserisci il titolo del post"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contenuto</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Cosa stai pensando?"
                required
                className="textarea textarea-bordered h-40"
              />
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                <Send className="mr-2 h-4 w-4" />
                Pubblica
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const Home = () => {
  const currentUser = useQuery(api.auth.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const allPosts = useQuery(api.posts.list, { userId: currentUser?._id });

  const filteredPosts = allPosts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (post) => {
    setSelectedPost(post);
    document.getElementById('post-modal').showModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/newpost" className="btn btn-primary">Crea Nuovo Post</Link>
        </div>
        <input 
          type="text" 
          placeholder="Cerca nei tuoi post..." 
          className="input input-bordered w-full max-w-xs" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="posts">
        <h2 className="text-2xl font-semibold mb-4">I Tuoi Post</h2>
        {allPosts === undefined ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map(post => (
              <div key={post._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-500">Creato il: {new Date(post._creationTime).toLocaleDateString()}</p>
                  <div className="card-actions justify-end">
                    <button onClick={() => openModal(post)} className="btn btn-primary btn-sm">Leggi di più</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Non hai ancora creato nessun post. Inizia ora!</span>
          </div>
        )}
      </section>

      {/* Finestra modale post */}
      <dialog id="post-modal" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Visualizza Post</h3>
          {selectedPost && (
            <>
              <h2 className="text-xl font-semibold mt-4">{selectedPost.title}</h2>
              <p className="mt-2">{selectedPost.content}</p>
              <p className="text-sm text-gray-500 mt-4">Creato il: {new Date(selectedPost._creationTime).toLocaleDateString()}</p>
            </>
          )}
          <div className="modal-action">
            <button className="btn">Chiudi</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Home;
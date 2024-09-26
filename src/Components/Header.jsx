import { useAuthActions } from '@convex-dev/auth/react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
const { signOut } = useAuthActions();
const location = useLocation();

  const handleLogout = async () => {
    await signOut()
    if(location.pathname !== '/'){
        window.location.href = '/'; 
    }
    // window.location.href = '/';
  };

  return (
    <header className="bg-base-100 shadow-lg">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">Theory Project</Link>
        </div>
        <div className="">
          <ul className="menu menu-horizontal px-1 space-x-3">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profilo</Link></li>
            <li>
              <button onClick={handleLogout} className="btn btn-outline btn-error">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
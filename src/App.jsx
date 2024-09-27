import './App.css'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useAuthActions } from '@convex-dev/auth/react';
import SignIn from './Container/SignIn'
import Header from './Components/Header';
import Home from './Container/Home';
import CreatePost from './Container/CreatePost';
import Profile from './Container/Profile';

function App() {
  const { signOut } = useAuthActions();

  return (
    <Router>
      <AuthLoading>
      <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
      </AuthLoading>
      
      <Unauthenticated>
      <Routes>
          <Route exact path="/" element={<SignIn/>} />
          {/* <Redirect to="/login" /> */}
          </Routes>
      </Unauthenticated>
      
      <Authenticated>
        <div className="app">
          <Header signOut={signOut} />
          <main>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path='/newpost' element={<CreatePost/>} />
              <Route path="/profile" element={<Profile/>} />
              </Routes>
          </main>
        </div>
      </Authenticated>
    </Router>
  )
}

export default App
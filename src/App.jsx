import './App.css'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators'
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
        <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
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
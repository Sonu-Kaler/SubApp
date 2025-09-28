import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './style.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to={"/dashboard"} replace />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/signIn' element={<Signin />} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/subscription' element={<PrivateRoute><Subscription /></PrivateRoute>} />
           </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;



// First - 
  // Install - npx create-react-app client - npm i axios react-router-dom - DONE.
  // create axios instances - DONE.
  // context - DONE.
  // pages - DONE.

// Second - Profile 
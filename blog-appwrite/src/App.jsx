import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((res) => {
        if(res) {
          dispatch(login(res))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
      <div className='h-screen'>
          <Header/>
          <main>
            <div className='mx-auto max-h-fit h- py-6 sm:px-6 lg:px-8'>
              <Outlet/>
            </div>
          </main>
          <Footer/>
      </div>
  ) : null
}

export default App

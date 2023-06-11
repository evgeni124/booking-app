import './styles/styles.scss';
import AuthForm from './components/screens/Auth/AuthForm';
import UserAccount from './components/screens/UserAccount/UserAccount';
// import Home from './components/screens/Home/Home'
import RequireAuth from './components/RequireAuth/RequireAuth';
import { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/screens/Header/Header';
import { useRefresh } from './hooks/useRefresh';
import Profile from './components/screens/Profile/Profile';
import PlaceItemInfo from './components/PlaceItemInfo/PlaceItemInfo';
import Bookings from './components/screens/Bookings/Bookings';

const Home = lazy(() => import('./components/screens/Home/Home'))
// const Profile = lazy(() => import('./components/screens/Profile/Profile'))
// const UserAccount = lazy(() => import('./components/screens/UserAccount/UserAccount'))
// const Bookings = lazy(() => import('./components/screens/Bookings/Bookings'))
// const AuthForm = lazy(() => import('./components/screens/Auth/AuthForm'))
// const PlaceItemInfo = lazy(() => import('./components/PlaceItemInfo/PlaceItemInfo'))
// const RequireAuth = lazy(() => import('./components/RequireAuth/RequireAuth'))

function App() {  
  const { refresh } = useRefresh()

  useEffect(() => {
    const refreshToken = async () => {
      await refresh()
    }
    refreshToken()
  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/' element={<RequireAuth/>}>
          <Route path='/user' element={<UserAccount/>}/>
          <Route path='/user/profile' element={<Profile/>}/>
          <Route path='/user/bookings' element={<Bookings/>}/>
        </Route>

        <Route path='/placeItemInfo/:id' element={<PlaceItemInfo/>}/>
        <Route path='/login' element={<AuthForm/>}/>
        <Route path='/register' element={<AuthForm/>}/>
      </Routes>
    </>
  );
}

export default App;

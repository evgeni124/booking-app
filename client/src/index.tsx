import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import AuthForm from './components/screens/Auth/AuthForm';
import Home from './components/screens/Home/Home';
import Profile from './components/screens/Profile/Profile';
import UserAccount from './components/screens/UserAccount/UserAccount';
import Bookings from './components/screens/Bookings/Bookings';
import PlaceItemInfo from './components/PlaceItemInfo/PlaceItemInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/placeItemInfo/:id',
        element: <PlaceItemInfo/>
      },
      {
        path: '/user',
        element: <UserAccount/>,
        children: [
          {
            path: '/user/profile',
            element: <Profile/>
          },
          {
            path: '/user/bookings',
            element: <Bookings/>
          }
        ]
      },
      {
        path: '/login',
        element: <AuthForm/>
      },
      {
        path: '/register',
        element: <AuthForm/>
      }
    ]
  }
])

export function Loading() {
  return (<div>...</div>)
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading/>}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </Suspense>
  </React.StrictMode>
);


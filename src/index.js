import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cart from './pages/Cart';
import Main from './pages/Main/Main';
import Mypage from './pages/Mypage';
import OrderList from './components/OrderList/OrderList';
import UserInfo from './components/UserInfo/UserInfo';
import BookDetail from './pages/BookDetail';
import Admin from './pages/Admin';
import Books from './pages/Books/Books';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'books/:id',
        element: <BookDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'mypage',
        element: <Mypage />,
        children: [
          {
            index: true,
            element: <UserInfo />,
          },
          {
            path: 'order-list',
            element: <OrderList />,
          },
        ],
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

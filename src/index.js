import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import Home from './view/Home';
import Mylists from './view/Mylists';
import Newlist from './view/Newlist';
import { Provider } from 'react-redux';
import store from './store/index'
import Todos from './view/Todos';
import Update from './view/Update';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/my-lists',
        element: <Mylists/>,
      },
      {
        path: '/todo-details/:id',
        element: <Todos/>
      },
      {
        path: '/new-list',
        element: <Newlist/>
      },
      {
        path: '/edit/:id',
        element: <Update/>
      },
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);

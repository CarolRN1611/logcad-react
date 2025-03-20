import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import Cadastro from './pages/Cadastro.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
  },
  {
    path: "/cadastro",
    element : <Cadastro/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
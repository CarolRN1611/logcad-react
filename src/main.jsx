import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RecuperarSenha from './pages/RecuperarSenha.jsx'
import ValidarCodigo from './pages/ValidarCodigo.jsx'
import AlterarSenha from './pages/AlterarSenha.jsx'
import Perfil from './pages/Perfil.jsx'
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
  {
    path: "/recuperar-senha",
    element : <RecuperarSenha/>,
  },
  {
    path: "/validar-codigo",
    element : <ValidarCodigo/>,
  },
  {
    path: "/perfil/:id",
    element : <Perfil/>,
  },
  {
    path: "/alterar-senha",
    element: <AlterarSenha/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
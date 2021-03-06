import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Index from 'pages/home/Index';
import IndexCategory1 from 'pages/category1/Index';
import Category1 from 'pages/category1/CategoryPage1';
import IndexUsuarios from 'pages/usuario';
import IndexUsuariosLider from 'pages/usuario/indexUsuariosLider';
import IndexProyectos from 'pages/proyecto/index';
import IndexInscripciones from 'pages/inscripcion/index';
import IndexAvances from 'pages/avance/index';
import 'styles/globals.css';
import 'styles/table.css'
import EditarUsuario from 'pages/usuario/editar';
import EditarProyecto from 'pages/proyecto/editar';
import AceptarInscripcion from 'pages/inscripcion/aceptar';
import RechazarInscripcion from 'pages/inscripcion/rechazar';
import jwt_decode from 'jwt-decode';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import IndexProyectosLider from 'pages/proyecto/indexLider';
import DetallesProyecto from 'pages/proyecto/detallesProyecto';
import EditarEstudiante from 'pages/usuario/editarEstudiante';
import CrearAvance from 'pages/avance/crear';
import Observacion from 'pages/avance/observacion';

// import PrivateRoute from 'components/PrivateRoute';
/* const httpLink = createHttpLink ({
  uri: 'https://prueba-graphql-paula.herokuapp.com/graphql'
}) */

const httpLink = createHttpLink({
  //uri: 'http://localhost:4000/graphql',
  uri: 'https://scc-back-test.herokuapp.com/graphql'

});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/proyectos' element={<IndexProyectos />} />
                <Route path='/proyectos/editar/:_id' element={<EditarProyecto />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
                <Route path='/inscripciones/aceptar/:_id' element={<AceptarInscripcion />} />
                <Route path='/inscripciones/rechazar/:_id' element={<RechazarInscripcion />} />
                <Route path='/avances' element={<IndexAvances />} />
                <Route path='/proyectosLider' element={<IndexProyectosLider />} />
                <Route path='/proyecto/:_id' element={<DetallesProyecto/>} />
                <Route path='/usuariosLider' element={<IndexUsuariosLider/>} />
                <Route path='/avance/crear/:_id' element={<CrearAvance/>} />
                <Route path='/avance/observaciones/:_id' element={<Observacion/>} />
                <Route path='/usuarios/editar/estudiantes/:_id' element={<EditarEstudiante />} />
                
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;

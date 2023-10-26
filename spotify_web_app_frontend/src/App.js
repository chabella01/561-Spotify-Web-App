import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes, useNavigate, useRoutes} from "react-router-dom";
import {useEffect, useState} from "react";
import RenderRoutes from '../src/Modules/RenderRoutes/RenderRoutes'
import {ProtectedRoute} from "./Modules/Routing/ProtectedRoute";
import Connections from "./Modules/Connections/Connections";
import Login from "./Modules/Login/Login";
import Register from "./Modules/Register/Register";
import Layout from "./Modules/Layout/Layout";
import CreateSession from "./Modules/CreateSession/CreateSession";
import {useAuth} from "./Modules/Routing/AuthProvider";
import {completeLogin, getAccessToken} from '../src/Modules/SpotifyHelpers/SpotifyHelpers'
import Callback from '../src/Modules/Callback/Callback'
function App() {



  return (
    <Routes>
        <Route element={<Layout />}>
            <Route path = '/login' element={<Login />}/>
            <Route path = '/register' element={<Register/>}/>
            <Route path = '/' element={<Navigate to={'/login'}/>}/>
            <Route path = '/callback' element={<Callback />}/>
            <Route
                path={'/connections'}
                element={
                    <ProtectedRoute>
                        <Connections />
                    </ProtectedRoute>
                }
            />
            <Route
                path={'/create_session'}
                element={
                    <ProtectedRoute>
                        <CreateSession />
                    </ProtectedRoute>
                }
            />
        </Route>
    </Routes>
  );
}

export default App;

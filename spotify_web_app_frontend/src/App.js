import logo from './logo.svg';
import './App.css';
import {Route, Routes, useRoutes} from "react-router-dom";
import {useEffect, useState} from "react";
import RenderRoutes from '../src/Modules/RenderRoutes/RenderRoutes'
import {ProtectedRoute} from "./Modules/Routing/ProtectedRoute";
import Connections from "./Modules/Connections/Connections";
import Login from "./Modules/Login/Login";
import Register from "./Modules/Register/Register";
function App() {

  return (
    <Routes>
        <Route path = '/login' element={<Login />}/>
        <Route path = '/register' element={<Register/>}/>
        <Route
            path={'/connections'}
            element={
                <ProtectedRoute>
                    <Connections />
                </ProtectedRoute>
            }
        />
    </Routes>
  );
}

export default App;

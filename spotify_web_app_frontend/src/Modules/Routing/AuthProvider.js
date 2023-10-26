import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import {beginLogin} from "../SpotifyHelpers/SpotifyHelpers";
import {logout} from '../SpotifyHelpers/SpotifyHelpers'
const AuthContext = createContext(null)

// context lets you pass parameters to deeply nested components very easily
// also allows you to have a global state
// here we are storing the user information in context provider so all child components
// wrapped by this provider will have access to the user data


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null)
    const navigate = useNavigate()

    const login = async (data) => {
        setUser(data)
        await beginLogin()
        navigate('/connections') // set to correct path later
    }

    const logout = () => {
        setUser(null)
        window.localStorage.removeItem('tokenSet')
        navigate('/login', { replace : true })
    }

    const value = useMemo( // use memo stores the value in cache memory to save overhead on rerenders
        () => ({
            user,
            login,
            logout
        }), [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

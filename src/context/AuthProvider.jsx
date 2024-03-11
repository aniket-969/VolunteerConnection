import React from 'react'
import { useContext, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const initialState = {
    user: {},
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },

}

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [locationDetails, setLocationDetails] = useState([])
    const [userLocation, setUserLocation] = useState()
    const navigate = useNavigate()

    let loginTime = localStorage.getItem('loginTime');

    if (loginTime) {

        const myFunction = () => {
            console.log('Executing every 20 seconds');
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - parseInt(loginTime, 10);
            const fiveMinutesInMillis = 1 * 60 * 1000;
            if (elapsedTime >= fiveMinutesInMillis) {

                removeCookie('accessToken');
                removeCookie('userData');
                localStorage.clear();
                setIsAuthenticated(false);
                navigate('/sign-up');
                clearInterval(intervalId)
            }
        };

        const intervalId = setInterval(myFunction, 20000);

    }

    const value = {
        user, setUser, isAuthenticated, setIsAuthenticated, userLocation, setUserLocation, locationDetails, setLocationDetails
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUserContext = () => useContext(AuthContext);
import React, {createContext, useState, useEffect} from "react";
import api from "../AxiosInstance";
import {login, register, logout} from "../services/SignSystemService";

const defaultContextValue = {
    currentUser: null, provideLogin: async () => {
    }, provideLogout: async () => {
    }, provideRegister: async () => {
    },
};

const SignContext = createContext(defaultContextValue);

export const SignProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const provideRegister = async (firstName, lastName, email, password, passwordConfirm, date, lat, lon, blood, donor) => {
        try {
            const user = await register(firstName, lastName, email, password, passwordConfirm, date, lat, lon, blood, donor);
            setCurrentUser(user);
        } catch (error) {
            console.error('რეგისტრაცია ვერ ხერხდება', error);
        }
    };

    const provideLogin = async (email, password) => {
        try {
            const user = await login(email, password);
            setCurrentUser(user);
        } catch (error) {
            console.error('ავტორიზაცია ვერ ხერხდება', error);
        }
    };

    const provideLogout = async () => {
        try {
            await logout();
            setCurrentUser(null);
        } catch (error) {
            console.error('გამოსვლა ვერ ხერხდება', error);
        }
    };

    return (<SignContext.Provider value={{currentUser, provideRegister, provideLogin, provideLogout}}>
        {children}
    </SignContext.Provider>);
};

export default SignContext;
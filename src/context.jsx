import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {

    //  ...... returns  Current User data ......
    //  custom hook useFetch , getCurrentUser function in api auth (supabse custom  function for getting user)
    const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        fetchUser();
    }, [])

    return <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>{children}</UrlContext.Provider>
}


export const urlState = () => {
    return useContext(UrlContext);
}

export default UrlProvider;

import { urlState } from '@/context';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const RequierAuth = ({ children }) => {
    const navigate = useNavigate();
    const { loading, isAuthenticated } = urlState();  // ....context-api

    //   if user is not-loggedIn  then it should direct auth page (not go to dashboard page) 
    useEffect(() => {

        //   if not authenticated (i.e user not logenIn) then navigate to auth page
        //   details:  user not loggedIn isauthentcated will return false 
        //   , again !isAuthenticated will reverse the value   .i.e.   false to true
        if (!isAuthenticated && loading === false) navigate("/auth");

    }, [isAuthenticated, loading])

    //   if loading then show a spinner
    if (loading) <BarLoader width={"100%"} color="#36d7b7"></BarLoader>;

    //   if authenticated then render the children component
    if (isAuthenticated) return children;

}

export default RequierAuth
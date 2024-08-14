import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { urlState } from '@/context';

const Auth = () => {


  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const { loading, isAuthenticated } = urlState();  // ....context-api

  //   if user is loggedIn no need to show auth page directly move to dashboard page  
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading])


  return (
    <div className='flex flex-col items-center gap-8 mt-6  md:mt-8  mb-4  md:mb-8'>

      <h1 className='text-5xl font-extrabold'>{longLink ? "Hold up! Let's Login First" : "LogIn / SignUp"}</h1>

      {/* tabs component */}
      <Tabs defaultValue="account" className=" w-full  md:w-[400px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">LogIn</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />      {/* custom login component */}
        </TabsContent>
        <TabsContent value="signup">
          <Signup />   {/* custom signup component */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth
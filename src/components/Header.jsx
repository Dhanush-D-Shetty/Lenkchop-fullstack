import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { urlState } from '@/context';
import useFetch from '@/hooks/useFetch';
import { logOut } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
  let navigate = useNavigate();
  const { user, fetchUser } = urlState();   //  context-api => gives current user data.
  const { loading, fn: fnLogOut } = useFetch(logOut);  // custom hook which recives a funtion

  console.log(user);
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link to="/">
          <img src="/logo3.jpg" alt="logo" width={80} />
        </Link>

        {/* logout-login part  */}
        <div>{
          !user ? (
            <Button onClick={() => navigate("/auth")} className="hover:scale-[1.1] transition-all">LogIn</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-[150px]" >
                  <Link to="/dashboard" className="flex gap-2">
                    <LinkIcon />  {/* logout con from lucid-icons     */}
                  <span>   My Links </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 flex gap-2">
                  <LogOut />       {/* logout con from lucid-icons     */}
                  <span onClick={() => {
                    fnLogOut().then(() => {
                      fetchUser();
                      navigate("/")
                    })
                  }}>   Log-out   </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#fff" />}
    </>
  )
}

export default Header
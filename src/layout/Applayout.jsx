import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header"


const Applayout = () => {
    return (
        <div>
            <main className='min-h-screen container'>
                <Header />           {/* nav-bar  */}
                <Outlet />
            </main>
            {/* footer */}


            <footer className="bg-gray-900 text-white py-6 mt-auto">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <h2 className="text-lg font-bold">Link Chop</h2>
                        <p className="text-sm">Chop your links down to size with ease.</p>
                        <p className="text-sm">&copy; 2024 Link Chop. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://github.com/Dhanush-D-Shetty/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-[1.4] transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.19 11.44c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.03-1.61-4.03-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.84 1.24 1.84 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.34-5.46-5.94 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.57.12-3.28 0 0 1.01-.32 3.3 1.23A11.51 11.51 0 0112 6.07c1.02.01 2.04.14 3 .41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.71.24 2.97.12 3.28.77.84 1.24 1.92 1.24 3.23 0 4.61-2.8 5.63-5.47 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/dhanush-d-shetty-843bb4264/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-[1.4] transition duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.63 3H4.37A1.37 1.37 0 003 4.37v15.26A1.37 1.37 0 004.37 21h15.26A1.37 1.37 0 0021 19.63V4.37A1.37 1.37 0 0019.63 3zM8.18 18.34H5.64V9.34h2.54v9zm-1.27-10.3a1.47 1.47 0 11.03-2.93 1.47 1.47 0 01-.03 2.93zm10.3 10.3h-2.54v-4.55c0-1.09-.02-2.49-1.52-2.49-1.52 0-1.75 1.18-1.75 2.41v4.63H9.9V9.34h2.44v1.23h.04c.34-.64 1.18-1.31 2.44-1.31 2.61 0 3.1 1.72 3.1 3.95v5.13z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Applayout
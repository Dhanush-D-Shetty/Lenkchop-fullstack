import "./App.css";
import Applayout from "./layout/Applayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandngPage from "./pages/LandngPage";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import Links from "./pages/Links";
import RedrectLinks from "./pages/RedrectLinks";
import UrlProvider from "./context";
import RequierAuth from "./components/require-auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <LandngPage />,
        },
        {
          path: "/dashboard",
          element: (
            <RequierAuth>
              <DashBoard />
            </RequierAuth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: (
            <RequierAuth>
              <Links />
            </RequierAuth>
          ),
        },
        {
          path: "/:id",
          element: <RedrectLinks />,
        },
      ],
    },
  ]);

  return (
    <div>
      <UrlProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UrlProvider>
    </div>
  );
}

export default App;

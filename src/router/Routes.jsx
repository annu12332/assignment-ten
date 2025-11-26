import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home";
import Services from "../pages/Services";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/services/:id",
                element: (
                    <PrivateRoute>
                        <Details />
                    </PrivateRoute>
                )
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    },

]);

export default router;
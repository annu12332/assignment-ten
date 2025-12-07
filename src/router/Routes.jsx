import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home";
import Services from "../pages/Services";
import PrivateRoute from "./PrivateRoute";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Add from "../pages/Add";
import MyAds from "../pages/MyAds";
import UpdateListing from "../pages/UpdateListing";
import MyOrders from "../pages/MyOrders";
import Terms from "../pages/Terms";

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
            },
             {
                path: "/addservices",
                element:(
                    <PrivateRoute><Add/></PrivateRoute>
                )
            },
            {
                path: "/myads",
                element:(<PrivateRoute><MyAds/></PrivateRoute>)
            },
            {
                path: "/updatelisting/:id",
                element: <UpdateListing/>
            },
            {
                path: "/my-orders",
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                )
            },
            {
                path: "/terms",
                element: <Terms/>
            }
        ]
    },

]);

export default router;
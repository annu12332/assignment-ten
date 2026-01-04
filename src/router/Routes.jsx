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
import ManageServices from "../dashboard/ManageServices";
import UpdateService from "../dashboard/UpdateService"; 
import MyOrders from "../pages/MyOrders";
import ManageOrder from "../dashboard/ManageOrder"; 
import Terms from "../pages/Terms";
import DashboardHome from "../dashboard/DashboardHome";
import Dashboard from "../dashboard/Dashboard";
import About from "../pages/About";

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
                path: 'home',
                element: <Home />
            },
            {
                path: "services",
                element: <Services />,
            },
            {
                path: "services/:id",
                element: (
                    <PrivateRoute>
                        <Details />
                    </PrivateRoute>
                )
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: "terms",
                element: <Terms />
            },
            {
                path: "about",
                element: <About />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                index: true, // Mane /dashboard e gele eta default dekhabe
                element: <DashboardHome />, 
            },
            {
                path: "add", // URL hobe: /dashboard/add
                element: <Add />
            },
            {
                path: "manage-services", // URL: /dashboard/manage-services
                element: <ManageServices />
            },
            {
                path: "update/:id", // URL: /dashboard/update/:id
                element: <UpdateService />
            },
            {
                path: "my-orders", // URL: /dashboard/my-orders
                element: <MyOrders />
            },
            {
                path: "manage-all-orders", // URL: /dashboard/manage-all-orders
                element: <ManageOrder />
            }
        ]
    }
]);

export default router;
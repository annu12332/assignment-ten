import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home";
import Services from "../pages/Services";

const router = createBrowserRouter([
{
    path: "/",
    element: <Root/>,
    children:[
        {
            path:'/home',
            element:<Home/>
        },
        {
            path:"/services",
            element:<Services/>,
        }
    ]
},

]);

export default router;
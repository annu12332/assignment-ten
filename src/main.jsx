import React, { useEffect } from "react"; 
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import router from "./router/Routes";
import AuthProvider from "./AuthProvider";
import './index.css';

import AOS from 'aos';
import 'aos/dist/aos.css'; 

const RootComponent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 100,   
      once: false,  
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
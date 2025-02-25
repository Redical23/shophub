"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

import Sessionwarpper from "./componets/Sessionwarpper"
import React from 'react';
import Models from "./componets/Models";
const inter = Inter({ subsets: ["latin"] });
import Contentwapper from "./context/Contentwapper"

import { useModelContext } from '../app/context/Context';
import dynamic from "next/dynamic";






export default function RootLayout({ children }) {
  
  const { isModelOpen, setIsModelOpen } = useModelContext();
  const pathname = usePathname();
  
  const handleClick = () => {
    setShowModels(! isModelOpen); // Toggle the visibility of Models component
  };
  const LAHEAD = dynamic(() => import("./slidebar/LAHEAD"), { ssr: false });
  
  const shouldShowLAHEAD =  pathname !== "/" && pathname !== "/pruser/setting" && pathname !=="/pruser/editprofile" && pathname !=="/Login"&& pathname !=="/Register"     ;

 
  return (
    <html lang="en">

      <body className={inter.className}>
        <Sessionwarpper>
          <Contentwapper>
          {shouldShowLAHEAD && <LAHEAD />}
            <div className="min-h-screen body  ">
            
            { isModelOpen && <Models />}
              
              {children}
           
              </div>        
           
          </Contentwapper>
        </Sessionwarpper>
      </body>
    </html>
  );
}




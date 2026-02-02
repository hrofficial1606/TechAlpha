import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hackathon from "./pages/Hackathon";
import About from "./pages/About";
import Sponsors from "./pages/Sponsors";
import Contact from "./pages/Contact";
import Dev from "./pages/Dev";
import WorkshopExplore from "./pages/WorkshopExplore";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      
    
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/hackthons" element={<Hackathon />} />
         <Route path="/about" element={<About />} />
         <Route path="/sponsors" element={<Sponsors />} />
         <Route path="/contact" element={<Contact />} />
          <Route path="/dev" element={<Dev />} />
          
          <Route path="/workshops/explore" element={<WorkshopExplore />} />
        

      </Routes>
   
       
    </BrowserRouter>
    
  </React.StrictMode>
);

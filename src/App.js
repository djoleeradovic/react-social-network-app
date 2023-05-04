import React from "react";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthPage, Homepage } from "./Pages";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/react-social-media-app" element={<AuthPage />} />
        <Route path="/home/" element={<Homepage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

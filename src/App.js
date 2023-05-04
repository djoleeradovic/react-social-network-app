import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, Homepage } from "./Pages";

const App = () => {
  return (
    <BrowserRouter basename="/react-social-network-app">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

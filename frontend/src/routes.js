// src/routes.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/searchPage/SearchPage";
import Header from "./components/header/Header";
import ProfilePage from "./pages/profilePage/ProfilePage";

const AppRoutes = () => {
  const [query, setQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const phone = localStorage.getItem("phone_number");
    setIsAuthenticated(!!phone);
  }, [location]);
  return (
    <>
      {isAuthenticated && <Header onSearch={setQuery} />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage query={query} />} />
        <Route path="/profilePage" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

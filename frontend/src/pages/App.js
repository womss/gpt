// src/pages/App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SorticHeader from '../components/Header/Header';
import LandingPage from '../components/LandingPage/LandingPage';
import SorterPage from '../components/SorterPage/components/SorterPage';
import LoginPage from '../components/LoginPage/LoginPage';
import SorterDefaultPage from '../components/SorterPage/components/SorterDefaultPage';

const App = () => {
    // 전역 테마 초기화
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        document.documentElement.setAttribute('data-theme', saved || 'light');
    }, []);

    return (
        <>

        <SorticHeader />
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sorter" element={<SorterPage />} />
            <Route path="/sorterDefaultPage" element={<SorterDefaultPage />} />
            </Routes>

        </>
    );
};

export default App;

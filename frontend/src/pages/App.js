import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SorticHeader from '../components/Header/Header';
import LandingPage from '../components/LandingPage/LandingPage';
import SorterPage from '../components/SorterPage/components/SorterPage';

const App = () => {
    return (
        <>
            <SorticHeader />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sorter" element={<SorterPage />} />
            </Routes>
        </>
    );
};

export default App;
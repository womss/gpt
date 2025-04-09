import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SorticHeader from '../components/Header/Header';
import LandingPage from '../components/LandingPage/LandingPage';
import SorterPage from '../components/SorterPage/components/SorterPage';
import SorterPageDefault from '../components/SorterPage/components/SorterPageDefault';
const App = () => {
    return (
        <>
            <SorticHeader />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sorter" element={<SorterPage />} />
                <Route path="/SorterPageDefault" element={<SorterPageDefault />} />
            </Routes>
        </>
    );
};

export default App;
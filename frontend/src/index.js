// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import App from './pages/App';
import './index.css';
import './styles/theme.css'; // ✅ 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider>
            <ConfigProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
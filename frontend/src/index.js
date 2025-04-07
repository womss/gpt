import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import App from './pages/App';

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
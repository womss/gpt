// frontend/src/components/pages/Login.js

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Input, Button, message } from 'antd';
import { isLoggedInAtom } from '../atoms/atoms';  // 로그인 상태 관리
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

    const handleLogin = async () => {
        try {
            // 백엔드로 로그인 요청
            const response = await axios.post('http://localhost:8080/api/login', { username, password });

            if (response.data.success) {
                setIsLoggedIn(true);  // 로그인 성공
                message.success('로그인 성공!');
            } else {
                message.error('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            message.error('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <h2>로그인 페이지</h2>
            <Input
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '300px', marginBottom: '10px' }}
            />
            <Input.Password
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '300px', marginBottom: '10px' }}
            />
            <Button type="primary" onClick={handleLogin}>
                로그인
            </Button>
        </div>
    );
};

export default Login;

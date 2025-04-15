// src/components/LoginPage/Login.js
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isLoggedInAtom } from '../SorterPage/atoms/atoms';
import styles from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                setIsLoggedIn(true);
                message.success('로그인 성공!');
            } else {
                message.error('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            message.error('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Sortic 로그인</h1>
                <Input
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <Input.Password
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <Button type="primary" className={styles.button} onClick={handleLogin}>
                    로그인
                </Button>
                <p className={styles.linkText}>
                    아직 계정이 없으신가요?{' '}
                    <Link to="/signup" className={styles.link}>
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

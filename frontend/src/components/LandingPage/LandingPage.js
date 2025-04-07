// components/Landing/LandingPage.js
import React from 'react';
import { Button, Typography } from 'antd';
import Carousel from './Carousel';
import styles from './LandingPage.module.css';

const { Title, Text } = Typography;

const LandingPage = () => (
    <div className={styles.container}>
        <div className={styles.left}>
            <Title>Sortic에 오신 것을 환영합니다!</Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
                로그인 후 더욱 다양한 서비스를 만나보세요!
            </Text>
            <div className={styles.buttons}>
                <Button type="primary">로그인</Button>
                <Button>회원가입</Button>
            </div>
        </div>
        <div className={styles.right}>
            <Carousel />
        </div>
    </div>
);

export default LandingPage;

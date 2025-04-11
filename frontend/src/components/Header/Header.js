// src/components/Header/Header.js
import React from 'react';
import { Layout, Menu, Badge, Avatar, Switch } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../SorterPage/atoms/atoms';
import styles from './Header.module.css';

const { Header } = Layout;

const SorticHeader = () => {
    const [user] = useAtom(userAtom);

    // 다크모드 toggle
    const toggleTheme = (checked) => {
        document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
        localStorage.setItem('theme', checked ? 'dark' : 'light');
    };

    // 페이지 진입 시 이전 설정 적용
    React.useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    }, []);

    return (
        <Header className={styles['header-container']}>
            <div className={styles.logo}>Sortic</div>
            <div className={styles['menu-container']}>
                <div className={styles['menu-item']}><Link to="/">Home</Link></div>
                <div className={styles['menu-item']}><Link to="/sorter">Sorter</Link></div>
                <div className={styles['menu-item']}>Cart</div>
                <div className={styles['menu-item']}>Q&A</div>
                <div className={styles['menu-item']}>Community</div>
            </div>
            <div className={styles['right-section']}>
                <Badge dot>
                    <BellOutlined className={styles['notification-icon']} />
                </Badge>
                <Avatar icon={<UserOutlined />} className={styles.avatar} />
                <span className={styles.username}>{user.nickname || 'Guest'}</span>
                <Switch
                    onChange={toggleTheme}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                    className={styles.themeSwitch}
                />
            </div>
        </Header>
    );
};

export default SorticHeader;

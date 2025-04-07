// components/Header/Header.js
import React from 'react';
import { Layout, Menu, Badge, Avatar } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../SorterPage/atoms/atoms';
import styles from './Header.module.css';

const { Header } = Layout;

const SorticHeader = () => {
    const [user] = useAtom(userAtom);

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
            </div>
        </Header>
    );
};

export default SorticHeader;

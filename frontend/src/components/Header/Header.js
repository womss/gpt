// components/Header/Header.js
import React from 'react';
import { Layout, Menu, Badge, Avatar } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/userAtom';

const { Header } = Layout;

const SorticHeader = () => {
    const [user] = useAtom(userAtom);

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>Sortic</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Home']} style={{ flex: 1, justifyContent: 'center' }}>
                <Menu.Item key="Home">Home</Menu.Item>
                <Menu.Item key="Sorter">Sorter</Menu.Item>
                <Menu.Item key="Cart">Cart</Menu.Item>
                <Menu.Item key="Q&A">Q&A</Menu.Item>
                <Menu.Item key="Community">Community</Menu.Item> {/* 추천 탭 추가 */}
            </Menu>
            <div style={{ color: 'white' }}>
                <Badge dot>
                    <BellOutlined style={{ fontSize: '20px', marginRight: 20 }} />
                </Badge>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 8 }}>{user.nickname || 'Guest'}</span>
            </div>
        </Header>
    );
};

export default SorticHeader;

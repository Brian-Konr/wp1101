import React, { useState } from 'react';
import { Layout, Menu, Input, Space, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../css/appbar.css';
const { Header, Content, Sider } = Layout;

const {Search} = Input;
const appbar = () => {
    
    return (
        <Layout>
            <Header 
                style=
                {{
                    position: 'relative', 
                    alignItems: 'center', 
                    backgroundColor: localStorage.getItem("username") ? '#FB8CB3' : '#5CB7FF'
                }}>
                <div className='innerbar'>
                    <div className='leftbar'>
                        <MenuOutlined style={{fontStyle: 'bold', fontSize: '150%'}} className='menu' />
                        <div className="logo" />
                        {/* <Search placeholder="input search text" style={{ width: 200, display: 'flex', alignItems: 'center' }} enterButton  /> */}
                    </div>
                    
                    <div className='rightbar'>
                        <Button id='signUp' className='sign-button'><Link to="/signup">註冊</Link></Button>
                        <Button id='signIn' className='sign-button'><Link to="/login">登入</Link></Button>
                        <Button id='Upload' className='sign-button'><Link to="/create">刊登活動</Link></Button>
                    </div>
                </div>
            </Header>
        </Layout>
        
    );
};

export default appbar;
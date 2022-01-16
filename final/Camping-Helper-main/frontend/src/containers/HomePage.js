import { Layout, Divider, Button } from 'antd';
import Hotcard from './HotCard';
import Navbar from '../components/Navbar';
import BottomFooter from '../components/BottomFooter';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import '../css/homepage.css';
import instance from '../instance';
import CategoryFilterBar from '../components/CategoryFilterBar';
const { Content } = Layout;


const Homepage = () => {

    const [category, setCategory] = useState(100);

    useEffect(() => {
        console.log(category);
    }, [category])

    return (
        <Layout 
            style={{
                backgroundColor: '#fff',
            }}>
            {/* <Appbar /> */}
            <Navbar />
            <Layout className='layout-container'>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 12,
                        margin: 0,
                    }}
                >
                    <div className='hotwrapper'>
                        <div className='classtitle'>
                            <h2>所有刊登活動</h2>
                        </div>
                        <Divider style={{
                            marginBottom: '3vh',
                            height: '0.4vh',
                            width: '100%',
                            display: 'block',
                            backgroundColor: '#64A1D1'}}/>
                        <div className='filter-home'>
                            {/* <Button className='filterbutton'>所有類別</Button>
                            <Button className='filterbutton' onClick={handleTagFilter(1)}>文法類</Button>
                            <Button className='filterbutton' onClick={handleTagFilter(2)}>財經類</Button>
                            <Button className='filterbutton' onClick={handleTagFilter(3)}>理工類</Button>
                            <Button className='filterbutton' onClick={handleTagFilter(4)}>醫護類</Button>
                            <Button className='filterbutton' onClick={handleTagFilter(5)}>其他</Button> */}
                            <CategoryFilterBar home_or_filter={"home"} />
                        </div>
                        <Hotcard params={{}}/>
                    </div>
                </Content>
            </Layout>
            <BottomFooter />
        </Layout>
    );
};

export default Homepage;
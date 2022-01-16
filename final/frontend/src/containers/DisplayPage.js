import { useState, useEffect } from "react";
import { Button, Divider, Tag, Layout, Modal } from "antd";
import moment from 'moment';
// import Appbar from "../components/Appbar";
import { Content } from "antd/lib/layout/layout";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../css/createActivity.css"
import { ClockCircleOutlined, EnvironmentOutlined, DollarOutlined, TeamOutlined, TagOutlined, BulbOutlined, WarningOutlined } from '@ant-design/icons';

const DisplayPage = ({src, activityName, startDate, signupDate, info, place, fee, quota, precaution, tag, link, type}) => {
    const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
    const dateFormat = 'YYYY-MM-DD';

    return (
        type === 'edit' ? 
            <div style={{display: 'flex', flexDirection: 'column', flex: 7, backgroundColor: '#fff', borderRadius: '16px 0px 0px 16px'}}>
                <div id="img-container" style={{maxHeight: '70vh', overflowY: 'hidden', borderRadius: '16px 0px 0px 0px'}}>
                    <img src={src} style={{width: '100%', padding: '0px', borderRadius: '16px 0px 0px 0px'}}/>
                </div>
                {<div style={{marginTop: '1vw', marginRight: '1.5vw', marginLeft: '1.5vw', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1 style={{fontSize: '1.6em'}}><span>營隊名稱 : </span>{activityName}</h1>
                    <Tag color="cyan" icon={<TagOutlined />} style={{fontSize: '1.1em', marginTop: '1vw', size: 'large'}}>
                        類組分類 ( optional )
                    </Tag>
                </div>}
                <div>
                    <Tag icon={<ClockCircleOutlined />} color="warning" style={{fontSize: '1.1em', marginTop: '1vw', marginRight: '1.5vw', marginLeft: '1.5vw', size: 'large'}}>
                        報名期間 : {moment(signupDate[0]).format(datetimeFormat)} ~ {moment(signupDate[1]).format(datetimeFormat)}
                    </Tag>
                </div>
                <div className="general-information">
                    <div className="detail">
                        <ClockCircleOutlined id="create-icon"/>
                        <h2>活動時間 : {moment(startDate[0]).format(datetimeFormat)} ~ {moment(startDate[1]).format(datetimeFormat)}</h2>
                    </div>
                    <div className="detail">
                        <EnvironmentOutlined id="create-icon"/>
                        <h2>活動地點 : {place}</h2>
                    </div>
                    <div className="detail">
                        <DollarOutlined id="create-icon"/>
                        <h2>活動費用 : {fee} 元</h2>
                    </div>
                    <div className="detail">
                        <TeamOutlined id="create-icon"/>
                        <h2>活動名額 : {quota} 人</h2>
                    </div>
                </div>
                <div className="detail-info">
                    <div className="detail-in">
                        <BulbOutlined id="info-icon"/>
                        <h2>活動資訊 :</h2>                            
                    </div>
                    <Divider id="info-divider" style={{
                        height: '2px',
                        width: '100%',
                        display: 'block',
                        backgroundColor: 'hsl(214, 30%, 67%)'}}/>
                    <Content className="content-container">
                        <p style={{whiteSpace: 'pre-line'}}> {info} </p>
                    </Content>
                    <div className="detail-in">
                        <WarningOutlined id="info-icon"/>
                        <h2>注意事項 :</h2>
                    </div>
                    <Divider id="info-divider" style={{
                        height: '2px',
                        width: '100%',
                        display: 'block',
                        backgroundColor: 'hsl(214, 30%, 67%)'}}/>
                    <Content className="content-container">
                        <p style={{whiteSpace: 'pre-line'}}> {precaution} </p>
                    </Content>
                </div>
            </div>
        : <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '16px'}}>
                <div id="img-container" style={{maxHeight: '80vh', overflowY: 'hidden', borderRadius: '16px 16px 0px 0px'}}>
                    <img src={src} style={{width: '100%', padding: '0px', borderRadius: '16px'}}/>
                </div>
                <div style={{marginTop: '1vh', marginLeft: '1.5vw', marginRight: '1.5vw', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <h1 style={{fontSize: '1.8em'}}>{activityName}</h1>
                    <Tag color="cyan" icon={<TagOutlined />} style={{fontSize: '1.1em', marginTop: '1vw', size: 'large'}}>
                        {tag === 1? "文法類" : 
                            tag === 2? "財經類" :
                                tag === 3? "理工類" :
                                    tag === 4? "醫護類" : "其他類別"}
                    </Tag>
                </div>
                <div>
                    <Tag icon={<ClockCircleOutlined />} color="warning" style={{fontSize: '1.1em', marginTop: '1vw', marginRight: '1.5vw', marginLeft: '1.5vw', size: 'large'}}>
                        報名期間 : {moment(signupDate[0]).format(datetimeFormat)} ~ {moment(signupDate[1]).format(datetimeFormat)}
                    </Tag>
                </div>
                <div className="general-information">
                    <div className="detail">
                        <ClockCircleOutlined id="create-icon"/>
                        <h2>活動時間 : {moment(startDate[0]).format(dateFormat)} ~ {moment(startDate[1]).format(dateFormat)}</h2>
                    </div>
                    <div className="detail">
                        <EnvironmentOutlined id="create-icon"/>
                        <h2>活動地點 : {place}</h2>
                    </div>
                    <div className="detail">
                        <DollarOutlined id="create-icon"/>
                        <h2>活動費用 : {fee} 元</h2>
                    </div>
                    <div className="detail">
                        <TeamOutlined id="create-icon"/>
                        <h2>活動名額 : {quota} 人</h2>
                    </div>
                </div>
                <div className="detail-info">
                    <div className="detail-in">
                        <BulbOutlined id="info-icon"/>
                        <h2>活動資訊 :</h2>                            
                    </div>
                    <Divider id="info-divider" style={{
                        height: '2px',
                        width: '100%',
                        display: 'block',
                        backgroundColor: 'hsl(214, 30%, 67%)'}}/>
                    <Content className="content-container">
                        <p style={{whiteSpace: 'pre-line'}}> {info} </p>
                    </Content>
                    <div className="detail-in">
                        <WarningOutlined id="info-icon"/>
                        <h2>注意事項 :</h2>
                    </div>
                    <Divider id="info-divider" style={{
                        height: '2px',
                        width: '100%',
                        display: 'block',
                        backgroundColor: 'hsl(214, 30%, 67%)'}}/>
                    <Content className="content-container">
                        <p style={{whiteSpace: 'pre-line'}}> {precaution} </p>
                    </Content>
                </div>
        </div>
    )
}

export default DisplayPage;
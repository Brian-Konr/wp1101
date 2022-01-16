import { useState } from 'react';
import { Card, Divider, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { TagOutlined } from '@ant-design/icons';

import '../css/card.css';

const {Meta} = Card;
const dateFormat = 'YYYY-MM-DD';
const ThumbnailCard = ({name, keyVal, src, startDate, tag, info}) => {
    const navigate = useNavigate();

    return (
        <Card
            className="show-card"
            key={keyVal}
            onClick={() => {navigate(`/camping_info/${keyVal}`)}}
            hoverable={true}
            bordered={false}
            cover={
                <img 
                    alt="cover"
                    src={src}
                    width='100%'
                    height='180px'
                />
            }
            bodyStyle={{backgroundColor: '#d2f1ff', height: '180px', padding: '8px 12px'}}
        >
            <div className='detail-wrapper'>
                <p>{moment(startDate[0]).format(dateFormat)} ~ {moment(startDate[1]).format(dateFormat)}</p>
                <Meta
                  title={name}
                  description={info}
                />
                <div>
                    <Divider style={{
                        height: '0.1vh',
                        width: '100%',
                        display: 'block',
                        backgroundColor: '#64A1D1'}}/>
                    <Tag color="cyan" icon={<TagOutlined />} style={{fontSize: '14px', marginLeft: '0.5vw', marginBottom: '3vh', size: 'median'}}>
                        {tag === 1? "文法類" : 
                                tag === 2? "財經類" :
                                    tag === 3? "理工類" :
                                        tag === 4? "醫護類" : "其他類別"}
                    </Tag>
                </div>
            </div>
        </Card>
    )
}

export default ThumbnailCard;
import React from 'react';
import 'antd/dist/antd.css';
import '../css/card.css';
import { Button, Radio, Card, Avatar } from "antd";

const generalcarddisplay = () => {
  const cardStyle = { 
    width: '240px',
    height: '300px',
    borderRadius: '16px',
    boxShadow: '2px 4px 6px 2px rgba(83, 83, 83, 0.3)',
    overflow: "hidden",
    margin: '0px 12px 0',
    border: 0 ,
 }
  const { Meta } = Card
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <div className="cardwrapper">
          <Card
            hoverable = {true}
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width='100%'
                height='180px'
              />
            }
            style={cardStyle}
            bodyStyle={{backgroundColor: '#d2f1ff', height: '120px'}}
          >
            <div className="date">2021/12/22</div>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            hoverable = {true}
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width='100%'
                height='180px'
              />
            }
            style={cardStyle}
            bodyStyle={{backgroundColor: '#d2f1ff', height: '120px'}}
          >
            <div className="date">2021/12/22</div>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            hoverable = {true}
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width='100%'
                height='180px'
                />
            }
            style={cardStyle}
            bodyStyle={{backgroundColor: '#d2f1ff', height: '120px'}}
          >
            <div className="date">2021/12/22</div>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            hoverable = {true}
            bordered={false}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                width='100%'
                height='180px'
              />
            }
            style={cardStyle}
            bodyStyle={{backgroundColor: '#d2f1ff', height: '120px'}}
          >
            <div className="date">2021/12/22</div>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </div>
      </div>
    </>
  )
}

export default generalcarddisplay

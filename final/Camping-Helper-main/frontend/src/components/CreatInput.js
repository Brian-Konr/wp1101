import { useState } from "react";
import { Upload, message, Card, Input, InputNumber, DatePicker, Button, Incon } from "antd";
import moment from 'moment';
import Loading from "./Loading";
import instance from '../instance';
import Modal from "antd/lib/modal/Modal";
import UploadImg from "./UploadImg";
import "../css/createInput.css"
import { ArrowDownOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const CreateInput = ({activityName, startDate, setFile, setActivityName, setStartDate, setInfo, setPlace, setFee, setQuota, setPrecaution, setSrc, signupDate, setSignUpDate}) => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';


    return (
        <>
            <div className="custom-card">
                <div>
                    <div className='inputTitle'>
                        輸入活動資訊 !
                    </div>
                    <Card title="營隊封面圖片">
                        <UploadImg 
                            setSrc={setSrc}
                            setFile={setFile}
                            />
                    </Card>
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>
                    <Card title="營隊名稱">
                        <Input placeholder="Activity Name" 
                            onChange={(e) => {setActivityName(e.target.value)}} 
                            value={activityName} 
                            id="inputcard"
                        />
                    </Card>
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>

                    <Card title="報名期間">
                        <RangePicker 
                            onChange={(date) => {
                                if(date !== null) {
                                    console.log(date);
                                    setSignUpDate(date)
                                }
                            }}
                            value={[moment(signupDate[0], dateFormat), moment(signupDate[1]), dateFormat]}
                            style={{'border-radius': '8px'}}
                        />
                    </Card>
                    
                    <Card title="營隊日期">
                        <RangePicker 
                            onChange={(date) => {
                                console.log(date);
                                if(date !== null) setStartDate(date);
                            }}
                            value={[moment(startDate[0], dateFormat), moment(startDate[1], dateFormat)]}
                            style={{'border-radius': '8px'}}
                        />
                    </Card>

                    
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>
                    <Card title="活動地點">
                        <Input placeholder="Where to host the activity?"
                                maxLength={100} onChange={(e) => {setPlace(e.target.value)}} 
                                id="inputcard"
                        ></Input>
                    </Card>
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Card title="活動費用">
                            <InputNumber defaultValue={2500} min={0} onChange={(e) => {setFee(e)} } style={{'border-radius': '8px'}}/>
                        </Card>
                        <Card title="活動名額">
                            <InputNumber defaultValue={70} min={0} max={300} onChange={(e) => {setQuota(e)}} style={{'border-radius': '8px'}}/>
                        </Card>
                    </div>
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>
                    <Card title="活動資訊">
                        <Input.TextArea
                            placeholder="輸入活動資訊"
                            showCount={true}
                            autoSize={{minRows: 2, maxRows: 10}}
                            maxLength={1500}
                            onChange={(e) => {setInfo(e.target.value)}}
                            id="inputcard"
                        />
                    </Card>
                    <ArrowDownOutlined style={{color: 'hsl(214, 30%, 67%)', fontSize: '20px'}}/>
                    <Card title="注意事項">
                        <Input.TextArea
                            placeholder="輸入注意事項"
                            showCount={true}
                            autoSize={{minRows: 2, maxRows: 10}}
                            maxLength={1000}
                            onChange={(e) => {setPrecaution(e.target.value)}}
                            id="inputcard"
                        />
                    </Card>
                </div>
                
            </div>
        </>
    )
}

export default CreateInput;
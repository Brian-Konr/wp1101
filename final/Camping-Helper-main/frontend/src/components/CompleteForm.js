import { useState, useEffect } from "react";
import moment from 'moment';
import { Form, Input, Select, Button, DatePicker, message, Modal } from "antd";
import instance from "../instance";
import Layout, { Content } from "antd/lib/layout/layout";
import { useNavigate } from "react-router-dom";
import "../css/completeForm.css"
// let questionArr = [1,2,3,4,5,6,7,8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
const rule = [
    {
        required: true,
        message: "這是必填項目!"
    }
]

const CompleteForm = ({questionArr, campId, setSuccess}) => { // pass {questionArr}

    const navigate = useNavigate();

    const [submitDisable, setSubmitDisable] = useState(false);

    useEffect(() => {
        setSubmitDisable(false);
    }, [])

    // TODO: Need to add temporary save, which involved in the communication with backend endpoint
    const onFinish = (values) => {
        if(questionArr.includes(6)) {
            // handle concat school and grade
            let concat = values.school + '_' + values.grade;
            console.log(concat);
            Object.assign(values, {school_name: concat});
            delete values.school;
            delete values.grade;
        }
        if(questionArr.includes(5)) {
            // handle birthdate from moment object to date
            let date = moment(values.birth_date).format(dateFormat);
            Object.assign(values, {birth_date: date});
        }
        console.log(values);
        postForm(values);
    }

    const postForm = async(values) => {
        try {
            let res = await instance.post(`/camp/${campId}/registration/`, values);
            console.log(res.status);
            console.log(res.data);
            if(res.status === 201) setSuccess(true);
        } catch (error) {
            console.log(error);
            if(error.response.status === 403) {
                // has joined
                message.error("您已報名過此活動!!", 1.5);
                setSubmitDisable(true);
            }
        }
    }

    return (
        <>
            <Layout className="answer-wrapper">
                <Form onFinish={onFinish} style={{margin: '2vw'}}>
                    <div id='q-form'>
                        {questionArr.includes(1) && (
                            <>
                                <h3>姓名</h3>
                                <Form.Item name="name" rules={rule}>
                                    {/* <h3>姓名</h3> */}
                                    <Input
                                        size="large"
                                        className='ind-item'
                                        type="text"
                                        placeholder="請輸入你的名字"
                                        // onChange={(e)=> {setFormAns({...formAns, name: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(2) && (
                            <>
                                <h3>生理性別</h3>
                                <Form.Item name="sex" rules={rule}>
                                    <Select
                                        size="large"
                                        placeholder="請選擇你的生理性別"
                                        className='ind-item'
                                        // onChange={(value) => {setFormAns({...formAns, sex: value})}}
                                    >
                                        <Option value="male">生理男</Option>
                                        <Option value="female">生理女</Option>   
                                    </Select>
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(3) && (
                            <>
                                <h3>你的國籍</h3>
                                <Form.Item name="nationality" rules={rule}>
                                    <Input 
                                        size="large"
                                        className='ind-item'
                                        type="text"
                                        placeholder="請輸入你的國籍"
                                        // onChange={(e)=> {setFormAns({...formAns, nationality: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(4) && (
                            <>
                                <h3>你的身分證字號 (開頭大寫)</h3>
                                <Form.Item name="id_number" rules={rule}>
                                    <Input 
                                        size="large"
                                        placeholder="請輸入你的身分證字號"
                                        className='ind-item'
                                        // onChange={(e)=> {setFormAns({...formAns, id_number: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(5) && (
                            <>
                                <h3>出生年月日</h3>
                                <Form.Item name="birth_date" rules={rule}>
                                    <DatePicker size="large" className='ind-item' /> 
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(6) && (
                            <>
                                <h3>學校名稱與年級</h3>
                                <Form.Item style={{display: 'flex'}}>
                                    <Form.Item name="school"  rules={rule}>
                                        <Input 
                                            size="large"
                                            type="text"
                                            placeholder="請輸入你的學校"
                                            className='ind-item'
                                            // onChange={(e) => {setSchool(e.target.value)}}
                                        />
                                    </Form.Item>
                                    <Form.Item name="grade" rules={rule}>
                                        <Select
                                            size="large"
                                            placeholder="年級"
                                            className='ind-item'
                                            // onChange={(value) => {setGrade(value)}}
                                        >
                                            <Option value={"一"}>一年級</Option>
                                            <Option value={"二"}>二年級</Option>
                                            <Option value={"三"}>三年級</Option>
                                        </Select>
                                    </Form.Item>
                                </Form.Item>
                            </>
                        )}
                        
                        {questionArr.includes(7) && (
                            <>
                                <h3>特殊疾病 (例: 無)</h3>
                                <Form.Item name="special_disease" rules={rule}>
                                    <Input 
                                        size="large"
                                        placeholder="疾病史"
                                        className='ind-item'
                                        // onChange={(e)=> {setFormAns({...formAns,  special_disease: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(8) && (
                            <>
                                <h3>Facebook 連結</h3>
                                <Form.Item name="fb_link" rules={rule}>
                                    <Input
                                        size="large"
                                        type="url"
                                        placeholder="Facebook 連結"
                                        className='ind-item'
                                        // onChange={(e)=> {setFormAns({...formAns, fb_link: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(9) && (
                            <>
                                <h3>飲食習慣</h3>
                                <Form.Item name="eating_habit" rules={rule}>
                                    <Select
                                        size="large"
                                        placeholder="請選擇你的飲食習慣"
                                        className='ind-item'
                                        // onChange={(value) => {setFormAns({...formAns, eating_habit: value})}}
                                    >
                                        <Option value="葷">葷</Option>
                                        <Option value="素">素</Option>   
                                    </Select>
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(10) && (
                            <>
                                <h3>電子信箱</h3>
                                <Form.Item name="email" rules={rule}>
                                    <Input 
                                        type="email"
                                        placeholder="請輸入你的電子信箱"
                                        className='ind-item'
                                        // onChange={(e) => {setFormAns({...formAns, email: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(11) && (
                            <>
                                <h3>聯絡電話</h3>
                                <Form.Item name="contact_number" rules={rule}>
                                    <Input 
                                        type="number"
                                        placeholder="請輸入你的手機號碼或其他聯絡電話"
                                        className='ind-item'
                                        // onChange={(e) => {setFormAns({...formAns, contact_number: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(12) && (
                            <>
                                <h3>監護人姓名</h3>
                                <Form.Item name="guardian_name" rules={rule}>
                                    <Input 
                                        type="text"
                                        placeholder="請輸入監護人姓名"
                                        className='ind-item'
                                        // onChange={(e) => {setFormAns({...formAns, guardian_name: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(13) && (
                            <>
                                <h3>與監護人之關係 (例: 父子)</h3>
                                <Form.Item name="guardian_relationship" rules={rule}>
                                    <Input 
                                        type="text"
                                        placeholder="請輸入你與監護人的關係"
                                        className='ind-item'
                                        // onChange={(e) => {setFormAns({...formAns, guardian_relationship: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(14) && (
                            <>
                                <h3>監護人之聯絡電話</h3>
                                <Form.Item name="guardian_contact_number" rules={rule}>
                                    <Input 
                                        type="number"
                                        placeholder="請輸入監護人的手機號碼或其他聯絡電話"
                                        className='ind-item'
                                        // onChange={(e) => {setFormAns({...formAns, guardian_contact_number: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(15) && (
                            <>
                                <h3>自我介紹</h3>
                                <Form.Item name="introduction" rules={rule}>
                                    <Input.TextArea 
                                        placeholder="自我介紹 (限 500 字內)"
                                        showCount={true}
                                        maxLength={500}
                                        // onChange={(e) => {setFormAns({...formAns, introduction: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(16) && (
                            <>
                                <h3>特殊經歷</h3>
                                <Form.Item name="special_experience" rules={rule}>
                                    <Input.TextArea 
                                        placeholder="特殊經歷 (限 500 字內)"
                                        showCount={true}
                                        maxLength={500}
                                        // onChange={(e) => {setFormAns({...formAns, special_experience: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(17) && (
                            <>
                                <h3>報名動機</h3>
                                <Form.Item name="motivation" rules={rule}>
                                    <Input.TextArea 
                                        placeholder="報名動機 (限 500 字內)"
                                        showCount={true}
                                        maxLength={500}
                                        // onChange={(e) => {setFormAns({...formAns, motivation: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(18) && (
                            <>
                                <h3>對營隊的期許</h3>
                                <Form.Item name="camp_anticipation" rules={rule}>
                                    <Input.TextArea 
                                        placeholder="對營隊的期許 (限 500 字內)"
                                        showCount={true}
                                        maxLength={500}
                                        // onChange={(e) => {setFormAns({...formAns, camp_anticipation: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {questionArr.includes(19) && (
                            <>
                                <h3>其他意見</h3>
                                <Form.Item name="other" rules={rule}>
                                    <Input.TextArea 
                                        placeholder="其他意見 (限 500 字內)"
                                        showCount={true}
                                        maxLength={500}
                                        // onChange={(e) => {setFormAns({...formAns, other: e.target.value})}}
                                    />
                                </Form.Item>
                            </>
                        )}
                    </div>
                    <div id='button-form'>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                id='ind-button'
                                disabled={submitDisable}
                            >
                                提交表單
                            </Button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Layout>
        </>
        
    )
}

export default CompleteForm;
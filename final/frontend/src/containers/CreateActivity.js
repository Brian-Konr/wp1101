import { useState, useEffect } from "react";
import { Form, message, Steps, Button, Divider, Tag, Input, Radio, Layout, Modal } from "antd";
import moment from 'moment';
// import Appbar from "../components/Appbar";
import DisplayPage from "./DisplayPage";
import { Content } from "antd/lib/layout/layout";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import CreateInput from "../components/CreatInput";
import StepController from "../components/StepController";
import "../css/createActivity.css"
import EditFormQuestion from "../components/EditFormQuestion";
import checkLogin from "../utility/checkLogin";
import totalCheck from "../utility/createInputTotalCheck";
import axios from 'axios';
import instance from "../instance";
import BottomFooter from '../components/BottomFooter';
import Background from "../icons/background.png";

const {Step} = Steps;
const dateFormat = "YYYY-MM-DD";
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
const CreateActivity = () => {

    const navigate = useNavigate();

    const [current, setCurrent] = useState(0);
	const [success, setSuccess] = useState(false); // true when post succeeds

    const [src, setSrc] = useState('https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
	const [file, setFile] = useState({}); // set image file
    const [activityName, setActivityName] = useState("");
    const [startDate, setStartDate] = useState(['2022-03-28', '2022-03-30']);
    const [signupDate, setSignUpDate] = useState(['2022-01-17', '2022-03-05']);
    const [info, setInfo] = useState("");
    const [place, setPlace] = useState("");
    const [fee, setFee] = useState(2500);
    const [quota, setQuota] = useState(70);
    const [precaution, setPrecaution] = useState("");
	const [link, setLink] = useState("");

    const [questionArr, setQuestionArr] = useState([]);

    const [submit, setSubmit] = useState(false);
	const [btnDisable, setBtnDisable] = useState(false);

    const [check, setCheck] = useState(false);

	const [tag, setTag] = useState(5); // default 其他類別
	const [shortDescription, setShortDescription] = useState("");
    

    useEffect(async() => {
		let loginCheck = await checkLogin();
        if(!loginCheck) {
            message.warn("請先登入再創辦活動!", 1.2);
            navigate('/login')
        };
    }, [current])

    useEffect(async() => {
        if(submit) {
            let loginCheck = await checkLogin();
            if(!loginCheck) {
                message.warn("請先登入再創辦活動!", 1.2);
                navigate('/login');
                return;
            }
			let formData = new FormData();
			formData.append('name', activityName);
			if(info.length !== 0) formData.append('information', info);
			console.log(Object.keys(file).length);
			if(Object.keys(file).length !== 0) formData.append('cover_photo', file);
			formData.append("camp_start_date", moment(startDate[0]).format(dateFormat));
			formData.append("camp_end_date", moment(startDate[1]).format(dateFormat));
			formData.append("register_start_date", moment(signupDate[0]).format(dateTimeFormat));
			formData.append("register_end_date", moment(signupDate[1]).format(dateTimeFormat));
			formData.append("place", place);
			if(link.length !== 0) formData.append("link", link);
			formData.append("fee", fee);
			formData.append("quota", quota);
			if(precaution.length !== 0) formData.append("precaution", precaution);
			console.log(questionArr);
			if(questionArr.length !== 0) {
                console.log(JSON.stringify(questionArr));
				formData.append('questions', JSON.stringify(questionArr));
			}
			if(shortDescription.length !== 0) formData.append("short_description", shortDescription);
			formData.append("category", tag);

			submitForm(formData);
        }
    }, [submit])

	const submitForm = async(form) => {
		const config = {
			headers:{
				'Content-Type': 'multipart/form-data'
			}
		}
		console.log(form);
		try {
			let res = await instance.post('/camp/', form, config);
			console.log(res.data);
			if(res.status === 201) {
				setBtnDisable(true);
				setSuccess(true);
			}
		} catch (error) {
			console.log(error);
            if(error.response.status === 413) message.warn("圖片檔過大，請重新挑選圖片!", 1.5);
			setBtnDisable(false);
		}
	}

	useEffect(() => {
		console.log(file);
	}, [file])

    useEffect(async () => {
        if(check) {

            let pass = await totalCheck(activityName, startDate, signupDate, place);
            if(pass) setCurrent(prev => prev + 1);
        }
    }, [check])

    useEffect(() => {
        console.log("startDateArr", startDate);
    }, [startDate])

    return (
        <Layout 
            style={{
                backgroundImage: `url(${Background})`,
            }}>
            <Navbar />
            <Layout className='layout-container'>
                <Steps className="stepwrapper" current={current}>
                    <Step title="活動頁面設計" description="讓頁面豐富精彩&#127775;"/>
                    <Step title="表單問題選擇" description="想問學員甚麼問題呢~"/>
                    <Step title="確認資訊與送出" description="加點標籤讓活動更吸睛" />
                </Steps>
                <div className="create-wrapper" style={{display: current === 0 ? 'flex' : 'none'}}>
                    <DisplayPage 
                        activityName={activityName}
                        signupDate={signupDate}
                        startDate={startDate}
                        info={info}
                        place={place}
                        fee={fee}
                        quota={quota}
                        precaution={precaution}
                        src={src}
                        type='edit'
                    />
                    <CreateInput
                        className='inputcontent'
                        activityName={activityName}
                        signupDate={signupDate}
                        startDate={startDate}
                        info={info}
                        place={place}
                        fee={fee}
                        quota={quota}
                        precaution={precaution}
                        setActivityName={setActivityName}
                        setStartDate={setStartDate}
                        setInfo={setInfo}
                        setPlace={setPlace}
                        setFee={setFee}
                        setQuota={setQuota}
                        setPrecaution={setPrecaution}
                        setSrc={setSrc}
                        setSignUpDate={setSignUpDate}
						setFile={setFile}
                    />
                </div>

                <div className="form-question" style={{display: current === 1 ? 'block' : 'none'}}>
                    <EditFormQuestion current={current} setQuestionArr={setQuestionArr}/>
                </div>

				<div style={{display: current === 2 ? 'flex': 'none', flexDirection: current === 2? 'column': 'none'}}>
                    <div className="question-title">
                        <h2>增添營隊資訊 !</h2>
                    </div>
                    <div className="final-wrapper">
                        <Form>
                            <h3>營隊簡短敘述</h3>
                            <Form.Item>
                                <Input.TextArea
                                    size="large"
                                    placeholder="請簡短地敘述您的營隊! (至多20字)"
                                    showCount={true}
                                    autoSize={{minRows: 2, maxRows: 5}}
                                    maxLength={20}
                                    value={shortDescription}
                                    onChange={(e) => {setShortDescription(e.target.value)}}
                                />
                            </Form.Item>
                            <div>
                                <h3>選擇營隊分類</h3>
                                <Form.Item>
                                    <Radio.Group buttonStyle="solid" onChange={(e) => {setTag(e.target.value)}} value={tag}>
                                        <Radio.Button size="large" value={1}>文法類</Radio.Button>
                                        <Radio.Button size="large" value={2}>財經類</Radio.Button>
                                        <Radio.Button size="large" value={3}>理工類</Radio.Button>
                                        <Radio.Button size="large" value={4}>醫護類</Radio.Button>
                                        <Radio.Button size="large" value={5}>其他</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <h3>相關資訊連結</h3>
                            <Form.Item>
                                <Input 
                                    size="large"
                                    type="url"
                                    placeholder="請瑱入相關資訊連結"
                                    onChange={(e) => setLink(e.target.value)}
                                    value={link}
                                />
                            </Form.Item>
                        </Form>
                    </div>      
				</div>

				<StepController
					setCheck={setCheck}
					current={current} 
					setCurrent={setCurrent} 
					submit={submit}
					setSubmit={setSubmit}
					setCheck={setCheck}
					btnDisable={btnDisable}
				/>

				<Modal
                    style={{borderRadius: '20px'}}
					visible={success}
					footer={[
                    <Button id="home-button" onClick={() => {
						navigate('/');
					}}>
                        知道了!
                    </Button>
                	]}
				>
					<p>活動創建成功!</p>
					<p>即將為您導回首頁...</p>
				</Modal>
            </Layout>
            <BottomFooter />
        </Layout>
    )
}

export default CreateActivity;
import { useState, useEffect } from "react";
import instance from "../instance";
import { useNavigate, useParams } from "react-router-dom";
import { Card, message, Divider, Modal, Button } from "antd";
import checkLogin from "../utility/checkLogin";
import CompleteForm from "../components/CompleteForm";
import Navbar from '../components/Navbar';
import BottomFooter from '../components/BottomFooter';
import Layout from "antd/lib/layout/layout";
import Background from "../icons/background.png";

const titleStyle = {
    color: 'black',
    fontSize: '1.5rem',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0.5vh',
}
const homeButton = {
    textAlign: 'center',
    borderRadius: '20px',
    borderColor: '#FB8CB3',
    color: '#fff',
    backgroundColor: '#FB8CB3',
}

const questions = [1];
const AnswerForm = () => {
    const navigate = useNavigate();
    const {campId} = useParams();
    const [campName, setCampName] = useState("");
    const [questionArr, setQuestionArr] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        setSuccess(false);
        let result = await checkLogin();
        if(result) {
            try {
                let {data} = await instance.get(`/camp/${campId}`);
                console.log(data);
                setCampName(data.name);
                setQuestionArr(data.questions);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            message.warn("請先登入後再報名", 1.2);
            navigate('/login');
        }
    }, [])

    return (
        <Layout
            style={{
                backgroundImage: `url(${Background})`,
            }}>
            <Navbar />
            <Layout style={{width: '43%', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                <div style={{minHeight: '4vh', backgroundColor: 'rgba(255, 255, 255, 0)'}}></div>
                    <h1 style={titleStyle}>{`${campName}報名表單`}</h1>
                <Divider style={{
                            marginBottom: '5vh',
                            height: '0.2vh',
                            width: '100%',
                            display: 'block',
                            backgroundColor: 'rgba(201, 186, 168, 0.795)'}}/>
                <CompleteForm 
                    questionArr={questionArr}
                    campId={campId}
                    setSuccess={setSuccess}
                />
            </Layout>
            <Modal
                style={{borderRadius: '20px'}}
                visible={success}
                footer={[ 
                <Button 
                    style={homeButton}
                    onClick={() => {
                    setSuccess(false);
                    navigate('/');
                }}>
                    知道了!
                </Button>
                ]}
            >
                <p>活動報名成功!</p>
                <p>即將為您導回首頁...</p>
            </Modal>
            {/* <FormInput value={name} setValue={setName} questionName={"姓名"} placeholder={"請輸入你的名字"} maxLength={10}/> */}
            <BottomFooter />   
        </Layout>
    )
}

export default AnswerForm;
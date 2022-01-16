import { useState, useEffect } from "react";
import instance from "../instance";
import { useNavigate, useParams } from "react-router-dom";
import { Card, message, Divider, Modal, Button } from "antd";
import checkLogin from "../utility/checkLogin";
import CompleteForm from "../components/CompleteForm";
import Navbar from '../components/Navbar';
import BottomFooter from '../components/BottomFooter';

const titleStyle = {
    color: 'black',
    fontSize: '1.5rem',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0.5vh'
}
const questionCard = {
    margin:'auto',
    width: '42vw',
    maxHeight: '10vh',
    position: 'relative',
    padding: '1vw',
    backgroundColor: '#fff',
    borderRadius: '24px',
    border: '2px solid #4faaf5bd'
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
        <>
            <Navbar />
            <div style={{minHeight: '4vh', backgroundColor: '#fff'}}></div>
            <div style={questionCard}>
                <h1 style={titleStyle}>{`${campName}報名表單`}</h1>
            </div>
            <div style={{minHeight: '4vh', backgroundColor: '#fff'}}></div>
            <CompleteForm 
                questionArr={questionArr}
                campId={campId}
                setSuccess={setSuccess}
            />
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
        </>
    )
}

export default AnswerForm;
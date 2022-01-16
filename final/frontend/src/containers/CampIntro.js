import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { Layout} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../instance";
import DisplayPage from "./DisplayPage";
import Navbar from "../components/Navbar";
import "../css/campIntro.css";
import checkLogin from "../utility/checkLogin";
import { COVERS } from "../utility/randomCover";
import moment from 'moment';
import BottomFooter from '../components/BottomFooter';
import Background from "../icons/background.png";

const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
const now = moment().format(datetimeFormat);

const CampIntro = () => {

    const {campId} = useParams();
    const navigate = useNavigate();
    const [view, setView] = useState(""); // 3 views. Own, Joined, and Guest
    const [src, setSrc] = useState("");
    const [activityName, setActivityName] = useState("");
    const [startDate, setStartDate] = useState(['2022-03-28', '2022-03-30']);
    const [signupDate, setSignUpDate] = useState(['2022-01-17', '2022-03-05']);
    const [info, setInfo] = useState("");
    const [place, setPlace] = useState("");
    const [fee, setFee] = useState(2500);
    const [quota, setQuota] = useState(70);
    const [precaution, setPrecaution] = useState("");
    const [tag, setTag] = useState(5); // default 其他類別
	const [link, setLink] = useState("");
    const [login, setLogin] = useState(true);


    useEffect(async () => {
        
        try {
            let res = await instance.get(`/camp/${campId}/`);
            const loginCheck = await checkLogin();
            if(loginCheck) {
                console.log(res.data);
                if(res.data.host === parseInt(localStorage.getItem("userId"))) {
                    // host is entering this page, so he / she is not going to see the signup button. In contrast, they need to view current signup form
                    setView("host");
                    console.log("host");
                }
                else {
                    // need to check if the user has joined or not
                    try {
                        let joinRes = await instance.get(`/camp/${campId}/registration/me/`);
                        if(joinRes.status === 200) setView("joined");
                        else setView("guest");
                    } catch (error) {
                        setView("guest");
                    }
                    
                }
            }
            else setView("guest");
            console.log("status", res.status);

            setActivityName(res.data.name);
            setSrc(res.data.cover_photo);
            setStartDate([moment(res.data.camp_start_date), moment(res.data.camp_end_date)]);
            setSignUpDate([moment(res.data.register_start_date), moment(res.data.register_end_date)]);
            setInfo(res.data.information);
            setFee(res.data.fee);
            setQuota(res.data.quota);
            setPlace(res.data.place);
            setPrecaution(res.data.precaution);
            setLink(res.data.link);
            setFee(res.data.fee);
            setTag(res.data.category);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Layout
            style={{
                backgroundImage: `url(${Background})`,
            }}>
            <Navbar setLogin={setLogin}/>
            <div style={{height: '5vh'}}></div>
            <Layout className='layout-container'>
                <DisplayPage 
                    activityName={activityName}
                    signupDate={signupDate}
                    startDate={startDate}
                    info={info}
                    place={place}
                    fee={fee}
                    quota={quota}
                    precaution={precaution}
                    src={src === null ? COVERS[Math.floor(Math.random()*COVERS.length)] : src}
                    tag={tag}
                    link={link}
                    type='display'
                />
                <div className="enterCamp-title">
                    <Button id="home-button" onClick={() => {navigate('/')}}>回到主頁</Button>

                    {view === "guest" ? 
                    <Button 
                        id="switch-button" 
                        onClick={() => {
                            let signupStart = signupDate[0].format(datetimeFormat);
                            let signupDue = signupDate[1].format(datetimeFormat);
                            let afterStart = moment(now).isAfter(signupStart);
                            let beforeDue = moment(now).isBefore(signupDue);
                            if(afterStart && beforeDue) navigate(`/answer_form/${campId}`);
                            else if(!afterStart) message.warn("活動尚未開放報名!", 1.5);
                            else if(!beforeDue) message.warn("活動已無法進行報名!", 1.5);
                        }} 
                        type="primary"
                    >
                        我要報名
                    </Button>
                    : <></>
                    }
                    
                    {(view === "host" && login) ? <Button id="switch-button" onClick={() => {navigate(`/manage/${campId}`)}} type="primary">查看報名狀況</Button> : <></>}
                </div>
            </Layout>
            <BottomFooter />
        </Layout>
    )
}

export default CampIntro;
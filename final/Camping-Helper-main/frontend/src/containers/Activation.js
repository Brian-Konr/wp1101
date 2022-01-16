import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, message, Modal } from "antd";
import axios from 'axios';
import instance from '../instance';

const Activation = () => {
    const [failed, setFailed] = useState("");
    const navigate = useNavigate();
    const [isModalVisible, setIsModelVisible] = useState(false);
    const { uid, token } = useParams();
    useEffect( async () => {
        try {
            let res = await instance.post('/auth/users/activation/', {
                uid: uid,
                token: token
            });
            console.log(res.status);
            setIsModelVisible(true);
        } catch(error) {
            console.log(error);
            if(error.response.status == 403 || error.response.status == 400) setFailed("Activation Failed!");
        }
    }, [])
    // const activate = async() => {
    // }
    // activate();
    return(
        <div>
            <Modal 
                closable={false} 
                title="帳號驗證確認" 
                visible={isModalVisible}
                footer={[
                    <Button onClick={() => {navigate('/login')}}>
                        OK
                    </Button>
                ]}
            >
                <p>驗證成功!</p>
                <p>系統將導至登入頁面...</p>
            </Modal>
            {/* <ul>
                <li>{`uid: ${uid}`}</li>
                <li>{`token: ${token}`}</li>
            </ul> */}
            <h1>{failed}</h1>
        </div>
    )
}

export default Activation;
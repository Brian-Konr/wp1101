import React from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import instance from '../instance';
import '../css/login.css'
import { Link, useNavigate} from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
const { Content } = Layout;

const NormalLoginForm = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    // just for test

    // let form = {
    //   email: "admin@dodofk.xyz",
    //   password: "#EDC$RFV%TGB"
    // }
    
    submit(values);
    // navigate('/');
  };

  const submit = async (form) => {
    try {
      let {data} = await instance.post('/auth/jwt/create/', form);
      if(data.access) {
        localStorage.setItem("token", data.access);
        await getInfo();
      }
    } catch (error) {
      message.error("帳號或密碼輸入錯誤! 請重新嘗試", 2);
      console.log(error.response);
    }
  }

  const getInfo = async () => {
    try {
      let {data} = await instance.get('/auth/users/me/');
      localStorage.setItem("userId", data.pk);
      console.log("userId", data.pk);
      localStorage.setItem("username", data.username);
      localStorage.setItem("name", data.name ? data.name : data.first_name); //because backend is not deployed yet
      localStorage.setItem("email", data.email);
      localStorage.setItem("birthday", data.birthday);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <Layout className='page'>
        <div className='Leftside-login'>
          <div id="backhome" onClick={() => navigate('/')}>
            <HomeOutlined id='homeIcon'/>
            <p style={{fontSize: '1.6em', color: '#fff'}}>主頁</p>
          </div>
          <div className='title'>
            歡迎回來!
          </div>
          <div className='intro'>
            介紹
          </div>
        </div>
        <div className='Rightside-login'>
          <div className='form-wrapper'>
            <h1>登入</h1>
          </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item 
                className='form-item'
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input 
                  size="large"
                  className='item'
                  prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  size="large"
                  className='item'
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <a className="login-form-forgot" href="">
                  忘記密碼？
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登入
                </Button>
                <div className='SignUp-alter'>
                  還沒有帳號嗎？ 
                  <Button type="default" className="alter-button" shape='round'>
                    <Link to = '/signup'>註冊</Link>
                  </Button>
                </div>
              </Form.Item>
            </Form>
        </div>
    </Layout>
  );
};

export default NormalLoginForm;
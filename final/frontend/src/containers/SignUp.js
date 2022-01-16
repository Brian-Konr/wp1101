import { useState } from 'react';
import { DatePicker, Form, Input, Select, Checkbox, Button, Layout, Modal } from 'antd';
import '../css/signup.css'
import { Link, useNavigate} from "react-router-dom";
import instance from '../instance';
import { HomeOutlined } from '@ant-design/icons';
const { Content } = Layout;

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const monthDayCheck = (month, day) => {
    let checkedMonth = month, checkedDay = day;
    if(month.length === 1) checkedMonth = `0${month}`;
    if(day.length === 1) checkedDay = `0${day}`;
    return {checkedMonth, checkedDay};
  }
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    let year = values.year;
    let {checkedMonth, checkedDay} = monthDayCheck(values.month, values.day);
    let date = `${year}-${checkedMonth}-${checkedDay}`;
    delete values.year;
    delete values.month;
    delete values.day;

    let finalForm = {...values, ...{birthday: date}};
    console.log(finalForm);
    submit(finalForm);
  };

  const submit = async (request) => {
    try {
      let res = await instance.post('/auth/users/', request);
      console.log(res.data);
      setIsModalVisible(true);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <Layout className='page'>
      <Content className='wrapper'>
        <Modal
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>註冊成功!</p>
          <p>請至您的電子信箱進行驗證</p>
        </Modal>
        <div className='Leftside-signup'>
          <div className='form-wrapper-s'>
            <h1>創建新帳號</h1>
            <Form
                {...formItemLayout}
                form={form}
                className='signup-form'
                name="register"
                onFinish={onFinish}
                initialValues={{}}
                scrollToFirstError
                >
                <Form.Item
                  name="name"
                  rules={[
                  {
                      required: true,
                      message: '輸入姓名',
                  },
                  ]}
                >
                    <Input className='item' placeholder="姓名"/>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="year"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 6px)' }}
                    >
                    <Input minLength={4} maxLength={4} className='item' placeholder="西元年" />
                    </Form.Item>
                    <Form.Item
                    name="month"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(25% - 6px)', margin: '0 8px' }}
                    >
                    <Input maxLength={2} className='item' placeholder="月" />
                    </Form.Item>
                    <Form.Item
                    name="day"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(25% - 6px)' }}
                    >
                    <Input maxLength={2} className='item' placeholder="日" />
                    </Form.Item>
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                  {
                      type: 'email',
                      message: '此電子郵件格式不正確',
                  },
                  {
                      required: true,
                      message: '輸入電子郵件',
                  },
                  ]}
                >
                    <Input className='item' placeholder="電子郵件"/>
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[
                  {
                      required: true,
                      message: '輸入使用者名稱',
                      whitespace: true,
                  },
                  ]}
                >
                    <Input className='item' placeholder="使用者名稱"/>
                </Form.Item>

                <Form.Item
                  name="password"            
                  rules={[
                  {
                      required: true,
                      message: '輸入密碼',
                  },
                  ]}
                  hasFeedback
                >
                    <Input.Password className='item' placeholder="密碼"/>
                </Form.Item>

                <Form.Item
                  name="re_password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                  {
                      required: true,
                      message: '請確認你的密碼',
                  },
                  ({ getFieldValue }) => ({
                      validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                      }

                      return Promise.reject(new Error('Te two passwords that you entered do not match!'));
                      },
                  }),
                  ]}
                >
                    <Input.Password className='item' placeholder="確認密碼"/>
                </Form.Item>
                <div className='button-wrapper'>
                {/*<Form.Item
                  name="if_agree"
                  valuePropName="checked"
                  rules={[
                  {
                      validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  },
                  ]}
                  {...tailFormItemLayout}
                >
                    <Checkbox className='sign-up-check'>
                      我同意此網站的<a href="">《服務條款》、《資料政策》</a>
                    </Checkbox>
                </Form.Item>*/}

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="SignUp-form-button">
                      註冊
                    </Button>
                    <div className='Login-alter'>
                      已經有帳號了？
                      <Button type="default" className="alter-button" shape='round'>
                        <Link to='/login'>登入</Link>
                      </Button>
                    </div>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <div className='Rightside-signup'>
          <div id="backhome-right" onClick={() => navigate('/')}>
            <HomeOutlined id='homeIcon'/>
            <p style={{fontSize: '1.3em', color: '#fff'}}>主頁</p>
          </div>
          <div className='title'>
            歡迎加入 !
          </div>
          <div className='intro'>
            <p>Camping-Helper</p>
            <p>讓你的營隊, 被更多人看見</p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

// haha just for test
export default RegistrationForm;
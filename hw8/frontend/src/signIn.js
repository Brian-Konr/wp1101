import './signIn.css';
import { Input, Button, message } from 'antd';

function SignIn({username, setUsername, setIsLogin}) {
    const checkLogin = () => {
        if(username.trim() !== "") {
            setIsLogin(true);
        }
        else message.error({content: "Username cannot be empty!", duration: 0.7});
    }
    return (
        <div className="signIn">
            <div className="signIn-title">
                <h1>Sign In</h1>
            </div>
            <div className="signIn-input">
                <Input
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    placeholder="Username"
                ></Input>
            </div>
            <Button
                type="primary"
                onClick = {checkLogin}
            >Login</Button>
        </div>
    )
}

export default SignIn
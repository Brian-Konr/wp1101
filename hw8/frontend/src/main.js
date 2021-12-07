import { useState } from "react";
import App from './App'
import SignIn from './signIn'

function Main() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [isLogin, setIsLogin] = useState(false);
    if(isLogin) {
        localStorage.setItem("username", username);
    }
    return (
        isLogin ? <App username = {username} /> : <SignIn username = {username} setUsername = {setUsername} setIsLogin = {setIsLogin} />
    )
}

export default Main
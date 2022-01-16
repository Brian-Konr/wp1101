import {Layout } from "antd";
import "../css/campManagement.css";

const {Footer} = Layout;
const footerStyle = {
    minHeight: '30vh',
    marginTop: '5vh',
    backgroundColor: '#433a7a'
}
const BottomFooter = () => {
    return (
        <Footer style={footerStyle}>
            <p style={{color: '#fff'}}>Copyright © 2021 @dodofk Liu @Alison Liu @Brain Konr</p>
        </Footer>
    )
}
export default BottomFooter;
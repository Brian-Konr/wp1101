import { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import {Button, Upload} from 'antd';

const UploadImg = ({setSrc, setFile}) => {
    const [disable, setDisable] = useState(false);
    
    const handleUpload = async (info) => {
        if(info.fileList.length == 0) setDisable(false);
        else {
            setDisable(true);
            setFile(info.file);
            setSrc(URL.createObjectURL(info.file));
        }
    }
    return (
        <>
            <Upload
                accept=".jpg, .jpeg, .png, .pdf"
                beforeUpload={() => false}
                // onPreview={(file) => console.log(file.url)}
                onChange={handleUpload}
            >
                <Button disabled={disable} icon={<UploadOutlined />} style={{'border-radius': '8px'}}>上傳圖片</Button>
            </Upload>
        </>
    )
}

export default UploadImg;
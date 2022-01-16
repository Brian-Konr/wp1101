import { useState, useEffect } from "react";
import { Card, Select } from "antd";
import { OPTIONS } from "../utility/questions";
import "../css/createActivity.css"

const EditFormQuestion = ({current, setQuestionArr}) => {
    
    const [selectedItems, setSelectedItems] = useState([]);

    //selectedKeys is used to post questions camp used
    const [selectedKeys, setSelectedKeys] = useState([]);

    const filteredOptions = OPTIONS.filter(option => !selectedItems.includes(option.title));

    const handleSelect = (items) => {
        setSelectedItems(items);
    }

    useEffect(() => {
        let filteredArr = OPTIONS.filter(option => selectedItems.includes(option.title));
        let keyArr = filteredArr.map(option => option.key);
        console.log(keyArr);
        setSelectedKeys(keyArr);
        setQuestionArr(keyArr);
    }, [current])

    return (
        <div className="questionWrapper">
            <div className="question-title">
                <h2>選擇表單問題 !</h2>
            </div>
            <Select
                mode="multiple"
                placeholder="請選擇表單的問題"
                value={selectedItems}
                onChange={handleSelect}
                style={{width: '35vw'}}
                size="large"
                // maxTagCount={8}
                >
                {filteredOptions.map((curOption) => (
                    <Select.Option style={{lineHeight: '40px'}} key={curOption.key} value={curOption.title}>
                        {curOption.title}
                    </Select.Option>
                ))}
            </Select>
        </div>
        
        

    )
}

export default EditFormQuestion;
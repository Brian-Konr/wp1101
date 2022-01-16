import { Input } from "antd";

const FormInput = ({value, setValue, questionName, placeholder, maxLength}) => {
    
    const handleInput = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <p>{questionName}</p>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInput}
                style={{width: '200px'}}
                maxLength={maxLength}
            />
        </>
    )
}

export default FormInput;
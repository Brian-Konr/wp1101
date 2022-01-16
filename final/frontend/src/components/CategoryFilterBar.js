import '../css/homepage.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Button } from 'antd';
const CategoryFilterBar = ({home_or_filter, view, name__contains}) => {

    console.log(view, name__contains);

    const navigate = useNavigate();

    const handleTagFilter = (tag) => {
        const params = {};
        if(view !== null && view !== undefined && view !== "undefined") Object.assign(params, {view: view});
        if(name__contains !== null && name__contains !== undefined && name__contains !== "undefined") Object.assign(params, {name__contains: name__contains});
        if(tag) Object.assign(params, {category: tag});
        navigate({
            pathname: '/search',
            search: `${createSearchParams(params)}`
        })
        
    }


    return (
        <>
            {home_or_filter === "home" ? <></> : <Button className='filterbutton' onClick={() => handleTagFilter()}>所有類別</Button>}
            <Button className='filterbutton' onClick={() => handleTagFilter(1)}>文法類</Button>
            <Button className='filterbutton' onClick={() => handleTagFilter(2)}>財經類</Button>
            <Button className='filterbutton' onClick={() => handleTagFilter(3)}>理工類</Button>
            <Button className='filterbutton' onClick={() => handleTagFilter(4)}>醫護類</Button>
            <Button className='filterbutton' onClick={() => handleTagFilter(5)}>其他</Button>
        </>
    )
}

export default CategoryFilterBar;
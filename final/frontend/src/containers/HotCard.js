import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ThumbnailCard from '../components/ThumbnailCard';
import PrevButton from "../icons/caret-left.png";
import NextButton from "../icons/caret-right.png";
import instance from '../instance';
import { Spin, Button } from 'antd';
import { COVERS } from '../utility/randomCover';
import { WarningOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../css/card.css';
const numEachPage = 6;

const DisplayCard = ({params}) => {

	const navigate = useNavigate();

	// TODO: when the data is empty, set icon

	const [cardArr, setCardArr] = useState([]);
	const [totalLen, setTotalLen] = useState(0);
	const [curPage, setCurPage] = useState(0);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(true);
	const [empty, setEmpty] = useState(false);


	useEffect(() => {
		setCardArr([]);
		setCurPage(0);
		setOffset(0);
	}, [params])

	useEffect(() => {
		if (cardArr.length === 0)
		{
			fetchData(0);
		}
	}, [cardArr])


	const fetchData = async (offset) => {
		try {
			let originalParams = {
				offset: offset,
				limit: numEachPage
			}
			if(Object.keys(params).length !== 0) {
				Object.assign(originalParams, params);
				// check valid param filter
			}
			console.log(originalParams);
			setLoading(true)
			let res = await instance.get('/camp/', {
				params: originalParams
			});
			// let res = await instance.get('/camp/');
			setLoading(false);
			console.log(res.data);
			if(res.data.count > 0) {
				setCardArr(cardArr.concat(res.data.results));
				setEmpty(false);
			}
			else if(res.data.count === 0) setEmpty(true);
			setTotalLen(res.data.count)
		} catch (error) {
			console.log(error.response);
			setLoading(false);
		}
	}
	

	useEffect(() => {
		if(cardArr.length < totalLen && cardArr !== 0) {
			fetchData(cardArr.length);
		}
	}, [curPage])

	const handleNext = () => {
		if((curPage + 1 ) < Math.ceil(totalLen * 1.0 / numEachPage)) setCurPage(prev => prev + 1);
	}

	const handlePrevious = () => {
		if(curPage > 0) setCurPage(prev => prev - 1);
	}

	return (
		<>
			{empty?
				(
					<>
						<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5vh'}}>
							<WarningOutlined id='warning-icon'/>
							<div id='pagination' style={{fontSize: '18px', marginTop: '2vh', color: 'hsl(0, 10%, 60%)'}}>Empty ! ! !</div>
						</div>
						<Button id="home-nav" onClick={() => navigate('/')}>返回首頁</Button>
					</>
				)
				:
				(
					<div id='pagination'>{`page : ${curPage+1} / ${Math.ceil(totalLen * 1.0 / numEachPage)}`}</div>	
				)
			}
			<div className='allCard-wrapper'>
				{empty?
					<></>
					:
					(
						<div className='stepButton'>
							{curPage === 0? <img src={PrevButton} style={{ width: '90%', opacity: '50%'}} alt="prev-button"/>
								: <img id="previous" src={PrevButton} style={{ width: '90%'}} alt="prev-button" onClick={handlePrevious}/>}
						</div>
					)
				}

				{
					loading ?
					<div className='loadingwrapper'>
						<Spin />
					</div>
					:
					<div className="cardwrapper">
						{
								cardArr.slice(curPage*numEachPage, curPage*numEachPage + numEachPage).map((item) => ( 
								<ThumbnailCard
									name={item.name}
									key={item.id} 
									keyVal={item.id} 
									src={item.cover_photo === null ? COVERS[Math.floor(Math.random()*COVERS.length)] : item.cover_photo}
									tag={item.category}
									startDate={[moment(item.camp_start_date), moment(item.camp_end_date)]}
									info={item.short_description}
									place={item.place}
								/> 
						))}
					</div>
				}
				{empty?
					<></>
					:
					(
						<div className='stepButton'>
							{(curPage + 1) === (Math.ceil(totalLen * 1.0 / numEachPage)) ? <img src={NextButton} style={{ width: '90%', opacity: '50%'}} alt="next-button" onClick={handlePrevious}/>
								: <img id="next"src={NextButton} style={{width: '90%'}} onClick={handleNext} alt="next-button"/>}
						</div>
					)
				}
			</div>
		</>
    )
}

export default DisplayCard

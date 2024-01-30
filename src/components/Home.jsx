import React, { useEffect } from 'react'
import './css/Home.css'
import Card from './Card'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading, setVideoList } from '../redux/slices/videoSlice'
import NoVideoFound from './NoVideoFound'
import NotAuthorized from './NotAuthorized'
import Loading from './Loading'

const Home = ({ type }) => {
	const dispatch = useDispatch()
	const { videoList, loading } = useSelector((state) => {
		return state.video
	})
	const { searchText } = useSelector((state) => {
		return state.search
	})
	useEffect(() => {
		try {
			const getVideo = async () => {
				dispatch(startLoading())
				let res;
				if (type === "random") {
					res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/video/random`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
				}
				if (type === "subscribed") {
					res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/video/subvids`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
				}
				if (type === "search") {
					res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/video/search?q=${searchText}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					})
				}
				const data = await res.json()
				if (res.status !== 200) {
					dispatch(setVideoList([]))
				}
				else {
					dispatch(setVideoList(data.data))
				}
				dispatch(stopLoading())
			}
			getVideo()
		} catch (e) {
			console.log(e.message)
		}
	}, [type, searchText])
	return (
		loading?(<Loading />):(<div className='home-container'>
			{
				videoList.length === 0 ? (
					type !== "subscribed" ? <NoVideoFound /> : <NotAuthorized />
				) : (
					videoList.map((video) => {
						return (
							<Card video={video} key={video._id} />
						)
					})
				)
			}
		</div>)
	)
}

export default Home

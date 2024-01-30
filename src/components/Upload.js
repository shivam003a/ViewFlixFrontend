import React, { useEffect, useState } from 'react'
import './css/Upload.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from '../firebase/firebase'
import toast from 'react-hot-toast'
import {useSelector} from 'react-redux'
import {NavLink, useNavigate} from 'react-router-dom'

const Upload = () => {
    const navigate =  useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [image, setImage] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgProgress, setImgProgress] = useState(0)
    const [videoProgress, setVideoProgress] = useState(0)
    const [imgUrl, setImgUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    const {logged} = useSelector((state)=>{
        return state.user
    })

    useEffect(() => {
        const upload = async () => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + image.name
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setImgProgress(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log('paused')
                            break;
                        case 'running':
                            console.log('upload running')
                            break
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                    })
                }
            )
        }
        image && upload()
    }, [image])

    useEffect(() => {
        const upload = async () => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + video.name
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, video);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setVideoProgress(progress)
                    switch (snapshot.state) {
                        case "paused":
                            console.log('paused')
                            break;
                        case 'running':
                            console.log('upload running')
                            break
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setVideoUrl(downloadURL)
                    })
                }
            )
        }
        video && upload()
    }, [video])

    const handleUpload = async (e) => {
        e.preventDefault()

        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/video/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, description, imgUrl, videoUrl, tags
            }),
            credentials: "include"
        })

        const data = await res.json()
        if (res.status === 200) {
            toast.success(data.msg)
            navigate('/')
        }
        else {
            toast.error(data.msg)
        }
    }

    return (
        <div className="upload-container">
            {
                logged?(
                    <div className='upload-card'>
                <p className='upload'>Upload</p>
                <div className='content-input'>
                    <span>video</span>
                    <input type='file' name='video' accept='video/*' onChange={(e) => { setVideo(e.target.files[0]) }} />
                    <div className='progress'>{videoProgress}%</div>
                </div>
                <div className='content-input'>
                    <span>image</span>
                    <input type='file' name='image' accept='image/*' onChange={(e) => { setImage(e.target.files[0]) }} />
                    <div className='progress'>{imgProgress}%</div>
                </div>
                <input type='text' name='title' placeholder='title' onChange={(e) => { setTitle(e.target.value) }} />
                <textarea name='description' rows={7} placeholder='description' onChange={(e) => { setDescription(e.target.value) }}></textarea>
                <input type='text' name='tags' placeholder='tags separated by comma (,)' onChange={(e) => { setTags(e.target.value.split(',')) }} />
                <button className='upload-button' onClick={handleUpload}>Upload</button>
            </div>
                ):(
                    <NavLink to="/signin" className="button" style={{textDecoration: "none"}}>SignIn</NavLink>
                )
            }
        </div>
    )
}

export default Upload

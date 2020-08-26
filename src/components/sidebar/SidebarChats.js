import React, { useState, useEffect } from 'react'
import '../../assets/css/sidebarChats.css'
// material
import { Avatar } from '@material-ui/core'
// database
import db from '../../config/firebase'
// router dom
import { Link } from 'react-router-dom'


const SidebarChat = ({ id, name, addNewChat }) => {

    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data())
                    )))
        }
    })

    const createChat = () => {
        const roomName = prompt('Enter the chat name');

        db.collection('rooms').add({
            name: roomName
        })
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChats">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat} className="sidebarChats">
                <h3>Add new room </h3>
            </div>
        );
}

export default SidebarChat

import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import '../../assets/css/chat.css';
// material
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutLined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import SendIcon from '@material-ui/icons/Send'
// routes dom
import { useParams } from 'react-router-dom'
//database
import db from '../../config/firebase'
// state
import { UseStateValue } from '../states/StateProvider'

const Chat = (props) => {

    const [seed, setSeed] = useState('')
    const [inputValue, setInputValue] = useState('')
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = UseStateValue()

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection('rooms').doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }

    }, [roomId])

    const sendMessage = e => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: inputValue,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInputValue('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>Last seen {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutLined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__sender ${message.name === user.displayName && "chat__reciever"}`} >
                        <small className="chat__user">{message.name}</small>
                        {message.message}
                        < small className="chat__timestamp" > {new Date(message.timestamp?.toDate()).toUTCString()}</small>
                    </p>
                ))
                }
            </div >
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <input placeholder="type a message"
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)} />
                <IconButton>
                    <button type="submit" className="submit"
                        onClick={sendMessage}>
                        <SendIcon />
                    </button>
                </IconButton>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div >
    )
}


export default Chat;
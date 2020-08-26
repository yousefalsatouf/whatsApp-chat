import React, { useState, useEffect } from 'react'
import '../../assets/css/sidebar.css'
// components
import SidebarChats from './SidebarChats'
// database
import db from '../../config/firebase'
// material
import { Avatar, IconButton } from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutLined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChats'
import { UseStateValue } from '../states/StateProvider'

const Sidebar = (props) => {
    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = UseStateValue()

    useEffect(() => {
        // to look for changes
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc =>
                ({
                    id: doc.id,
                    data: doc.data(),
                })
            ))
        ))

        //console.log(user)
    }, [])


    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <small>{user.displayName}</small>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutLined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChats addNewChat />
                {
                    rooms.map(room => (
                        <SidebarChat key={room.id}
                            id={room.id}
                            name={room.data.name} />
                    ))
                }
            </div>
        </div>
    )
}


export default Sidebar;
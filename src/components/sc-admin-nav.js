import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemText, Typography, Tooltip } from '@mui/material'
import Auth from '../Auth'
import '../scss/react.scss'
import NewEventDialog from './react/sc-new-event'
import { gotoRoute } from '../../src/Router'

export default function MUIDrawer() {
    const [isAdmin, setIsAdmin] = useState(Auth.currentUser.accessLevel === 'admin')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        setIsAdmin(Auth.currentUser.accessLevel === 'admin')
    }, [Auth.currentUser.accessLevel])


    const menuItems = [
        { text: 'Home' },
        { text: 'New Event' },
        { text: 'Manage Events' },
        { text: 'Log Out' }
    ]

    const handleLogout = () => {
        Auth.signOut()
        setIsAdmin(false)
        console.log('user logged out')
    }

    const handleMenuItemClick = (text) => {
        if (text === 'New Event') {
            setIsDialogOpen(true)
        } else if (text === 'Manage Events') {
            gotoRoute('/admin')
        } else if (text === 'Home') {
            gotoRoute('/')
        } else if (text === 'Log Out') {
            handleLogout()
    }}


    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    if (!isAdmin) {
        return null
    }

    return (
        <div>
            <Drawer
                anchor="right"
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '10em',
                        backgroundColor: '#000000',
                        borderLeft: '0.1em solid #FFC600'
                    }
                }}
            >
                <span className="material-icons" id="admin-icon">manage_accounts</span>
                <Typography className="admin-text">Name</Typography>
                <Typography className="admin-text">Editor</Typography>
                <List sx={{ color: '#FFF' }}>
                    {menuItems.map(({ text }) => (
                        <Tooltip title={text} key={text} placement="left">
                            <span>
                                <ListItem button key={text} onClick={() => handleMenuItemClick(text)}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </span>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>

            <NewEventDialog open={isDialogOpen} onClose={handleCloseDialog}></NewEventDialog>
        </div>
    )
}
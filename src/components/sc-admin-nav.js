import React, { useState, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemText, Typography, Tooltip } from '@mui/material'
import Auth from '../Auth'
import '../scss/react.scss'
import NewEventDialog from './react/sc-new-event'

export default function MUIDrawer() {
    const [isAdmin, setIsAdmin] = useState(Auth.currentUser.accessLevel === 'admin')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        setIsAdmin(Auth.currentUser.accessLevel === 'admin')
    }, [Auth.currentUser.accessLevel])

    const menuItems = [
        { text: 'New Event' },
        { text: 'Manage Events', disabled: false, tooltip: '', className: '' },  // Enable Manage Events
        { text: 'Manage Users', disabled: true, tooltip: 'Feature coming soon', className: 'disabled' },
        { text: 'Log Out', disabled: false, tooltip: '', className: '' }
    ]

    const handleLogout = () => {
        Auth.signOut()
        setIsAdmin(false)
        console.log('user logged out')
    }

    const handleMenuItemClick = (text) => {
        if (text === 'New Event') {
            setIsDialogOpen(true)
        } else if (text === 'Log Out') {
            handleLogout()
        }
    }

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